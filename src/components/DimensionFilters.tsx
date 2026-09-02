"use client";

import { useTranslations } from "next-intl";
import { DIMENSIONS, type DimensionId } from "@/content";
import { DIMENSION_COLORS, textOnDimension } from "@/lib/colors";
import { tLocalized } from "@/content";
import { useLocale } from "next-intl";
import type { AppLocale } from "@/i18n/routing";

export function DimensionFilters({
  active,
  onChange,
}: {
  active: DimensionId | "all";
  onChange: (id: DimensionId | "all") => void;
}) {
  const t = useTranslations("skills");
  const locale = useLocale() as AppLocale;

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={t("title")}>
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          active === "all"
            ? "bg-black font-bold text-white"
            : "border border-black/10 font-light hover:border-black/30"
        }`}
        aria-pressed={active === "all"}
      >
        {t("filterAll")}
      </button>
      {DIMENSIONS.map((d) => {
        const isActive = active === d.id;
        const bg = DIMENSION_COLORS[d.id];
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => onChange(d.id)}
            className="rounded-full px-4 py-2 text-sm font-bold transition-transform active:scale-95"
            style={{
              backgroundColor: isActive ? bg : "transparent",
              color: isActive ? textOnDimension(d.id) : undefined,
              border: isActive ? "none" : "1px solid rgba(0,0,0,0.1)",
              fontWeight: isActive ? 700 : 300,
            }}
            aria-pressed={isActive}
          >
            {tLocalized(d.name, locale)}
          </button>
        );
      })}
    </div>
  );
}
