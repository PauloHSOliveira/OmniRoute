"use client";

import { useTranslations } from "next-intl";

interface CertStatusIconProps {
  trusted: boolean;
  size?: number;
}

export function CertStatusIcon({ trusted, size = 16 }: CertStatusIconProps) {
  const t = useTranslations("agentBridge");
  return trusted ? (
    <span
      className="material-symbols-outlined text-emerald-600 dark:text-emerald-500"
      style={{ fontSize: size }}
      title={t("certTrusted")}
    >
      verified_user
    </span>
  ) : (
    <span
      className="material-symbols-outlined text-zinc-700 dark:text-zinc-400"
      style={{ fontSize: size }}
      title={t("certNotTrusted")}
    >
      lock_open
    </span>
  );
}
