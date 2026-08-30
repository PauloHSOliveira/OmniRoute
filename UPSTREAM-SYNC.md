# Upstream Synchronization Guide

This fork (`PauloHSOliveira/OmniRoute`) tracks the official upstream
(`diegosouzapw/OmniRoute`). This document describes how to safely pull
upstream changes into the fork while preserving local customizations.

## Remotes

```
origin   → git@github.com:PauloHSOliveira/OmniRoute.git   (your fork — read/write)
upstream → https://github.com/diegosouzapw/OmniRoute.git  (official — read-only)
```

Push to `upstream` is deliberately disabled. You can only pull from it.

---

## Standard Upstream Sync Workflow

```bash
# 1. Fetch all upstream changes (no local modification yet)
git fetch upstream

# 2. Review what's changed since your last sync
git log HEAD..upstream/release/v3.8.51 --oneline       # commits you don't have
git diff HEAD upstream/release/v3.8.51 -- Dockerfile    # specific file diff

# 3. Switch to your main branch
git checkout release/v3.8.51   # or main/master depending on your branch

# 4a. Merge (preserves history, easier conflict resolution)
git merge upstream/release/v3.8.51

# OR

# 4b. Rebase (linear history, cleaner but rewrites your commits)
git rebase upstream/release/v3.8.51

# 5. Resolve conflicts if any, then push to your fork
git push origin release/v3.8.51
```

---

## Files That Require Manual Review Before Merging

Never blindly accept upstream changes to the following. Review each diff
carefully before incorporating.

### 1. Database Migrations (`src/lib/db/migrations/`)

**Why it's sensitive:** New migrations run automatically on startup and may
modify or delete data.

**Review checklist:**
- Any new `DROP TABLE` or `DELETE FROM` in provider-owned rows?
- Does the migration affect tables you rely on (e.g. `combos`, `api_keys`, `memories`)?
- Is there a pre-migration backup created? (OmniRoute creates one automatically at startup)
- Check for destructive patterns: `DELETE FROM provider_connections WHERE provider = 'X'`

```bash
# Show migration files changed upstream but not in your branch
git diff HEAD upstream/release/v3.8.51 -- src/lib/db/migrations/
```

### 2. Dockerfile and Docker Compose Files

**Why it's sensitive:** Could change base image, build steps, volume mounts,
port assignments, or environment variable names.

```bash
git diff HEAD upstream/release/v3.8.51 -- Dockerfile docker-compose.yml
```

**Do NOT automatically accept:**
- Changes to `DATA_DIR` or volume mount paths (breaks your named volume)
- New mandatory env variables (add them to `.env.local.example` and `.env`)
- Base image upgrades (rebuild and test before deploying)

**Your local file `docker-compose.local.yml` is not in upstream** — it will
never have merge conflicts.

### 3. Memory / Qdrant (`src/lib/memory/`)

**Why it's sensitive:** Changes may affect how memories are stored, indexed,
or retrieved. A schema change to `memories` table or Qdrant collection format
could lose existing memories.

```bash
git diff HEAD upstream/release/v3.8.51 -- src/lib/memory/
```

**Watch for:**
- New required env variables for Qdrant
- Collection name or vector size changes (would need re-indexing)
- Changes to `vectorStore.ts` or `qdrant.ts` that alter the dual-write path

### 4. Authentication / Authorization

**Why it's sensitive:** Changes to JWT handling, session management, or API
key encryption could lock you out or invalidate existing credentials.

```bash
git diff HEAD upstream/release/v3.8.51 -- src/lib/auth/ src/lib/db/apiKeys.ts
```

**Never accept:**
- `STORAGE_ENCRYPTION_KEY_VERSION` format changes without understanding the migration path
- JWT algorithm changes (invalidates all sessions)

### 5. Provider Credentials (`open-sse/config/`)

**Why it's sensitive:** Provider removals create `DELETE FROM` migrations.
If you actively use a provider being retired, assess impact before upgrading.

```bash
git diff HEAD upstream/release/v3.8.51 -- open-sse/config/providers/
```

---

## Safe Merge Process (Step by Step)

```bash
# Step 1: backup before merging
BACKUP_TS=$(date '+%Y-%m-%d-%H%M%S')
mkdir -p ~/Backups/omniroute/$BACKUP_TS
docker stop omniroute-local
docker run --rm \
  -v omniroute-local-data:/data:ro \
  -v ~/Backups/omniroute/$BACKUP_TS:/backup \
  alpine:3.21 tar -czf /backup/omniroute-data.tar.gz -C /data .
docker start omniroute-local

# Step 2: fetch and review
git fetch upstream
git log HEAD..upstream/release/v3.8.51 --oneline
git diff HEAD upstream/release/v3.8.51 -- src/lib/db/migrations/ Dockerfile docker-compose.yml src/lib/memory/

# Step 3: merge to a test branch first
git checkout -b sync/upstream-$(date +%Y-%m-%d)
git merge upstream/release/v3.8.51

# Step 4: rebuild image
docker compose -f docker-compose.local.yml build omniroute

# Step 5: test on alternate port before cutting over
DASHBOARD_PORT=20138 API_PORT=20139 LIVE_WS_PORT=20140 \
  docker compose -f docker-compose.local.yml up -d
curl http://127.0.0.1:20138/api/health
curl http://127.0.0.1:20138/v1/models | python3 -c "import json,sys; d=json.load(sys.stdin); print('Models:', len(d['data']))"

# Step 6: if tests pass, cut over
DASHBOARD_PORT=20138 API_PORT=20139 LIVE_WS_PORT=20140 \
  docker compose -f docker-compose.local.yml down
docker stop omniroute-local
docker compose -f docker-compose.local.yml up -d

# Step 7: merge sync branch to main fork branch
git checkout release/v3.8.51
git merge sync/upstream-$(date +%Y-%m-%d)
git push origin release/v3.8.51
```

---

## Rollback Procedure

If an upstream merge causes issues:

```bash
# 1. Stop new stack
docker compose -f docker-compose.local.yml down

# 2. Restart original container (volume still intact)
docker start omniroute   # the pre-migration container
curl http://127.0.0.1:20128/api/health

# OR restore from backup to new volume:
docker run --rm \
  -v omniroute-local-data:/data \
  -v ~/Backups/omniroute/<TIMESTAMP>:/backup:ro \
  alpine:3.21 \
  sh -c 'rm -rf /data/* && tar -xzf /backup/omniroute-data.tar.gz -C /data'
```

---

## Local Customization Files (Never Upstream)

The following files exist only in your fork and will never conflict with upstream:

| File | Purpose |
|------|---------|
| `docker-compose.local.yml` | Personal deployment compose (source-built + Qdrant) |
| `.env.local.example` | Minimal env template for local deployment |
| `UPSTREAM-SYNC.md` | This document |

---

## Version Pinning

| Component | Pinned Version | Location |
|-----------|---------------|---------|
| Qdrant | `v1.12.4` | `docker-compose.local.yml` |
| Redis | `8.6.5-alpine` | `docker-compose.local.yml` |
| Node.js | `26` (via Dockerfile base) | `Dockerfile` |

When upgrading Qdrant, check the [Qdrant changelog](https://github.com/qdrant/qdrant/releases)
for breaking changes to the REST API or collection format before bumping the version.

---

## Quick Reference

```bash
# Daily start/stop
docker compose -f ~/Projects/OmniRoute/docker-compose.local.yml up -d
docker compose -f ~/Projects/OmniRoute/docker-compose.local.yml down

# Rebuild after source change
docker compose -f ~/Projects/OmniRoute/docker-compose.local.yml build omniroute
docker compose -f ~/Projects/OmniRoute/docker-compose.local.yml up -d

# Logs
docker compose -f ~/Projects/OmniRoute/docker-compose.local.yml logs -f
docker compose -f ~/Projects/OmniRoute/docker-compose.local.yml logs -f omniroute

# Check health
curl http://127.0.0.1:20128/api/health
docker compose -f ~/Projects/OmniRoute/docker-compose.local.yml ps

# Sync upstream
git fetch upstream
git log HEAD..upstream/release/v3.8.51 --oneline
```
