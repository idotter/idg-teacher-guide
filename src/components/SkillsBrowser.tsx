"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  DIMENSIONS,
  SKILLS,
  tLocalized,
  type DimensionId,
} from "@/content";
import { DimensionFilters } from "@/components/DimensionFilters";
import { SkillCardPreview } from "@/components/SkillCard";
import type { AppLocale } from "@/i18n/routing";

export function SkillsBrowser() {
  const t = useTranslations("skills");
  const locale = useLocale() as AppLocale;
  const [filter, setFilter] = useState<DimensionId | "all">("all");

  const skills = useMemo(
    () =>
      filter === "all" ? SKILLS : SKILLS.filter((s) => s.dimensionId === filter),
    [filter],
  );

  return (
    <div>
      <DimensionFilters active={filter} onChange={setFilter} />
      {skills.length === 0 ? (
        <p className="mt-10 text-center font-light text-black/60">{t("empty")}</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <SkillCardPreview
              key={skill.id}
              href={`/skills/${skill.id}`}
              skillId={skill.id}
              dimensionId={skill.dimensionId}
              skillName={tLocalized(skill.name, locale)}
              skillDescription={tLocalized(skill.description, locale)}
              index={i}
            />
          ))}
        </div>
      )}
      <p className="sr-only">
        {DIMENSIONS.map((d) => tLocalized(d.name, locale)).join(", ")}
      </p>
    </div>
  );
}
