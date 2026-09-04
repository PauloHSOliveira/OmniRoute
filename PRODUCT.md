# OmniRoute Product Context

## Product

OmniRoute is a self-hosted unified AI gateway and router. It provides one OpenAI-compatible endpoint for connecting AI tools and applications to a broad catalog of model providers.

## Users

The primary users are developers and teams who need a dependable, centralized way to access multiple AI providers and model APIs.

## Core outcome

Users can route AI traffic through one endpoint while reducing provider-specific integration work and improving resilience through automatic fallback and routing strategies. OmniRoute also helps control token usage through stacked RTK and Caveman compression.

## Capabilities

- Routes requests across 351 AI providers, including more than 90 free tiers.
- Provides automatic fallback and 19 routing strategies.
- Exposes OpenAI-compatible APIs.
- Includes RTK and Caveman stacked compression for reducing token usage.
- Provides MCP and A2A support for agent integrations.
- Includes a dashboard for configuration, monitoring, provider management, and free-tier visibility.
- Supports a desktop app and PWA experience.

## Product surfaces

- Web dashboard and application UI.
- OpenAI-compatible API.
- MCP and A2A agent protocol endpoints.
- Desktop application.
- Command-line interface.

## Platform

Web, API, desktop, PWA, and CLI.

## Design constraints

- Preserve technical accuracy around provider counts, free-tier budgets, routing behavior, and resilience.
- Keep operational interfaces scannable and efficient for frequent developer use.
- Treat self-hosting and operator control as core product expectations.
- Do not expose credentials or sensitive operator data in UI or documentation.
