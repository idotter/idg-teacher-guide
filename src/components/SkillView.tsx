"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SkillCard } from "@/components/SkillCard";
import type { TeacherBack } from "@/content/teacher-backs";
import type { DimensionId, SkillId } from "@/content/framework";

type Props = {
  skillId: SkillId;
  dimensionId: DimensionId;
  dimensionNumber: number;
  dimensionName: string;
  dimensionSubtitle: string;
  skillName: string;
  skillDescription: string;
  back: TeacherBack;
  prevId: SkillId | null;
  nextId: SkillId | null;
  current: number;
  total: number;
};

export function SkillView({
  skillId,
  dimensionId,
  dimensionNumber,
  dimensionName,
  dimensionSubtitle,
  skillName,
  skillDescription,
  back,
  prevId,
  nextId,
  current,
  total,
}: Props) {
  const t = useTranslations("card");
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: skillName, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/dimensions/${dimensionId}`}
          className="text-sm font-light underline underline-offset-2"
        >
          ← {t("backToDimension")}
        </Link>
        <p className="text-sm font-light text-black/55">
          {t("skillOf", { current, total })}
        </p>
      </div>

      <SkillCard
        key={skillId}
        skillId={skillId}
        dimensionId={dimensionId}
        dimensionNumber={dimensionNumber}
        dimensionName={dimensionName}
        dimensionSubtitle={dimensionSubtitle}
        skillName={skillName}
        skillDescription={skillDescription}
        back={back}
        large
      />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {prevId ? (
          <Link
            href={`/skills/${prevId}`}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-light hover:border-black/30"
          >
            ← {t("prev")}
          </Link>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={share}
          className="rounded-full border border-black/10 px-4 py-2 text-sm font-light hover:border-black/30"
        >
          {copied ? t("shareCopied") : t("share")}
        </button>
        {nextId ? (
          <Link
            href={`/skills/${nextId}`}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-light hover:border-black/30"
          >
            {t("next")} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
