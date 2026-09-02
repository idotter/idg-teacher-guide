import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getDimension,
  getSkillsForDimension,
  tLocalized,
  type DimensionId,
} from "@/content";
import { DIMENSIONS } from "@/content";
import { SkillCardPreview } from "@/components/SkillCard";
import { DimensionIcon } from "@/components/icons/DimensionIcon";
import { DIMENSION_COLORS, textOnDimension } from "@/lib/colors";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return DIMENSIONS.flatMap((d) =>
    (["de", "en"] as const).map((locale) => ({
      locale,
      dimensionId: d.id,
    })),
  );
}

export default async function DimensionPage({
  params,
}: {
  params: Promise<{ locale: string; dimensionId: string }>;
}) {
  const { locale: loc, dimensionId } = await params;
  const locale = loc as AppLocale;
  setRequestLocale(locale);

  const id = dimensionId as DimensionId;
  if (!DIMENSIONS.some((d) => d.id === id)) notFound();

  const dimension = getDimension(id);
  const skills = getSkillsForDimension(id);
  const t = await getTranslations("dimension");
  const bg = DIMENSION_COLORS[id];
  const onColor = textOnDimension(id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="text-sm font-light underline underline-offset-2"
      >
        ← {t("backHome")}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
        <div>
          <div
            className="mb-6 inline-flex rounded-full p-6"
            style={{ backgroundColor: bg, color: onColor }}
          >
            <DimensionIcon
              dimensionId={id}
              className="h-20 w-20 text-white sm:h-24 sm:w-24"
            />
          </div>
          <p className="text-sm font-light uppercase tracking-[0.14em] text-black/50">
            {dimension.number}
          </p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {tLocalized(dimension.name, locale)}
          </h1>
          <p className="mt-2 text-lg font-light text-black/70">
            {tLocalized(dimension.subtitle, locale)}
          </p>
          <p className="mt-6 max-w-prose text-base font-normal leading-relaxed text-black/80">
            {tLocalized(dimension.intro, locale)}
          </p>
          <p className="mt-4 text-sm font-light text-black/50">
            {t("skillCount", { count: skills.length })}
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">{t("skillsHeading")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
        </div>
      </div>
    </div>
  );
}
