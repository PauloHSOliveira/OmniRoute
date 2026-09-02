"use client";

/**
 * FilterBar — Shared UI primitive (T-29)
 *
 * Reusable filter bar with search input and optional filter chips.
 * Used by RequestLoggerV2, ProxyLogger, and similar data tables.
 *
 * Usage:
 *   <FilterBar
 *     searchValue={search}
 *     onSearchChange={setSearch}
 *     placeholder="Search logs..."
 *     filters={[
 *       { key: 'status', label: 'Status', options: ['ok', 'error'] },
 *       { key: 'provider', label: 'Provider', options: ['openai', 'anthropic'] },
 *     ]}
 *     activeFilters={activeFilters}
 *     onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
 *   />
 */

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";

export default function FilterBar({
  searchValue = "",
  onSearchChange,
  placeholder,
  filters = [],
  activeFilters = {},
  onFilterChange,
  children,
}) {
  const t = useTranslations("common");
  const [expandedFilter, setExpandedFilter] = useState(null);

  const handleClear = useCallback(() => {
    onSearchChange("");
    filters.forEach((f) => onFilterChange(f.key, ""));
    setExpandedFilter(null);
  }, [onSearchChange, filters, onFilterChange]);

  const hasActiveFilters = searchValue || Object.values(activeFilters).some((v) => v && v !== "");

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      {/* Search input */}
      <div className="relative min-w-[200px] flex-1">
        <span className="material-symbols-outlined pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[16px] text-text-muted">
          search
        </span>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder || t("search")}
          className="h-9 w-full rounded-control border border-border bg-white pl-9 pr-3 text-sm text-text-main outline-none transition-all placeholder:text-text-muted/60 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 dark:bg-white/5"
        />
      </div>

      {/* Filter chips */}
      {filters.map((filter) => (
        <div key={filter.key} className="relative">
          <button
            onClick={() => setExpandedFilter(expandedFilter === filter.key ? null : filter.key)}
            className={
              activeFilters[filter.key]
                ? "inline-flex h-9 items-center gap-1.5 rounded-control border border-primary/30 bg-primary/10 px-3 text-xs font-medium text-primary transition-colors"
                : "inline-flex h-9 items-center gap-1.5 rounded-control border border-border bg-white px-3 text-xs font-medium text-text-muted transition-colors hover:border-border-strong hover:text-text-main dark:bg-white/5"
            }
          >
            <span className="material-symbols-outlined text-[15px]">filter_list</span>
            {filter.label}
            {activeFilters[filter.key] ? ` · ${activeFilters[filter.key]}` : ""}
          </button>
          {expandedFilter === filter.key && (
            <div className="absolute left-0 top-full z-50 mt-1 min-w-[140px] rounded-md border border-border bg-surface p-1 shadow-soft">
              <button
                onClick={() => {
                  onFilterChange(filter.key, "");
                  setExpandedFilter(null);
                }}
                className="block w-full rounded px-3 py-1.5 text-left text-xs text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-main"
              >
                {t("all")}
              </button>
              {(filter.options || []).map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onFilterChange(filter.key, opt);
                    setExpandedFilter(null);
                  }}
                  className={
                    activeFilters[filter.key] === opt
                      ? "block w-full rounded px-3 py-1.5 text-left text-xs font-medium text-primary transition-colors hover:bg-bg-subtle"
                      : "block w-full rounded px-3 py-1.5 text-left text-xs text-text-main transition-colors hover:bg-bg-subtle"
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={handleClear}
          className="inline-flex h-9 items-center gap-1.5 rounded-control border border-error/30 bg-error/10 px-3 text-xs font-medium text-error transition-colors hover:bg-error/15"
        >
          <span className="material-symbols-outlined text-[15px]">close</span>
          {t("clear")}
        </button>
      )}

      {/* Extra controls (e.g. refresh button) */}
      {children}
    </div>
  );
}
