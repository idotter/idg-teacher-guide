import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  SKILLS,
  getAdjacentSkillIds,
  getCardContent,
  getSkillsForDimension,
  type SkillId,
} from "@/content";
import { SkillView } from "@/components/SkillView";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";
import { tLocalized } from "@/content";

export function generateStaticParams() {
  return SKILLS.flatMap((s) =>
    (["de", "en"] as const).map((locale) => ({
      locale,
      skillId: s.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; skillId: string }>;
}): Promise<Metadata> {
  const { locale: loc, skillId } = await params;
  const locale = loc as AppLocale;
  const skill = SKILLS.find((s) => s.id === skillId);
  if (!skill) return {};
  return {
    title: tLocalized(skill.name, locale),
    description: tLocalized(skill.description, locale),
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ locale: string; skillId: string }>;
}) {
  const { locale: loc, skillId } = await params;
  const locale = loc as AppLocale;
  setRequestLocale(locale);

  if (!SKILLS.some((s) => s.id === skillId)) notFound();
  const id = skillId as SkillId;
  const content = getCardContent(id, locale);
  const { prev, next } = getAdjacentSkillIds(id, "dimension");
  const siblings = getSkillsForDimension(content.dimension.id);
  const current = siblings.findIndex((s) => s.id === id) + 1;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SkillView
        skillId={id}
        dimensionId={content.dimension.id}
        dimensionNumber={content.dimension.number}
        dimensionName={content.dimensionName}
        dimensionSubtitle={content.dimensionSubtitle}
        skillName={content.name}
        skillDescription={content.description}
        back={content.back}
        prevId={prev}
        nextId={next}
        current={current}
        total={siblings.length}
      />
    </div>
  );
}
