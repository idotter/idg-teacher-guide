import type { AppLocale } from "@/i18n/routing";
import {
  DIMENSIONS,
  SKILLS,
  getAdjacentSkillIds,
  getDimension,
  getSkill,
  getSkillsForDimension,
  pickRandomSkillId,
  type DimensionId,
  type SkillId,
} from "./framework";
import { getTeacherBack } from "./teacher-backs";

export {
  DIMENSIONS,
  SKILLS,
  getAdjacentSkillIds,
  getDimension,
  getSkill,
  getSkillsForDimension,
  pickRandomSkillId,
};
export type { DimensionId, SkillId };

export function tLocalized(
  text: { de: string; en: string },
  locale: AppLocale,
): string {
  return locale === "en" ? text.en : text.de;
}

export function getCardContent(skillId: SkillId, locale: AppLocale) {
  const skill = getSkill(skillId);
  const dimension = getDimension(skill.dimensionId);
  const back = getTeacherBack(skillId, locale);
  return {
    skill,
    dimension,
    name: tLocalized(skill.name, locale),
    description: tLocalized(skill.description, locale),
    dimensionName: tLocalized(dimension.name, locale),
    dimensionSubtitle: tLocalized(dimension.subtitle, locale),
    dimensionIntro: tLocalized(dimension.intro, locale),
    back,
  };
}
