"use client";

import { useTranslations } from "next-intl";

/**
 * EmptyState — FASE-07 UX
 *
 * Reusable empty state component for dashboard sections when no data
 * is available. Provides visual feedback and optional action button.
 *
 * Usage:
 *   <EmptyState
 *     icon="📡"
 *     title="No providers yet"
 *     description="Add your first API provider to get started."
 *     actionLabel="Add Provider"
 *     onAction={() => router.push('/providers/add')}
 *   />
 */

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: (() => void) | null;
}

export default function EmptyState({
  icon = "📭",
  title,
  description = "",
  actionLabel = "",
  onAction = null,
}: EmptyStateProps) {
  const t = useTranslations("common");
  const resolvedTitle = title ?? t("nothingHere");
  const usesMaterialSymbol = /^[a-z][a-z0-9_]*$/.test(icon);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
        minHeight: "200px",
      }}
    >
      <div
        style={{
          fontSize: "44px",
          marginBottom: "16px",
          color: "var(--color-text-muted)",
          lineHeight: 1,
        }}
        role="img"
        aria-hidden="true"
      >
        {usesMaterialSymbol ? (
          <span className="material-symbols-outlined" style={{ fontSize: "inherit" }}>
            {icon}
          </span>
        ) : (
          icon
        )}
      </div>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--color-text-main)",
          margin: 0,
        }}
      >
        {resolvedTitle}
      </h3>
      {description && (
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-text-muted)",
            maxWidth: "320px",
            lineHeight: 1.5,
            marginTop: "8px",
          }}
        >
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            marginTop: "20px",
            padding: "8px 18px",
            borderRadius: "7px",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text-main)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.15s ease, border-color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--color-bg-subtle)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-strong)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--color-surface)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
