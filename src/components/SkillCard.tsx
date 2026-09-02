"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { DIMENSION_COLORS, IDG_COLORS, textOnDimension } from "@/lib/colors";
import type { DimensionId, SkillId } from "@/content/framework";
import { DimensionIcon } from "@/components/icons/DimensionIcon";
import { SkillMark } from "@/components/icons/SkillMark";
import type { TeacherBack } from "@/content/teacher-backs";
import { Link } from "@/i18n/navigation";

type SkillCardProps = {
  skillId: SkillId;
  dimensionId: DimensionId;
  dimensionNumber: number;
  dimensionName: string;
  dimensionSubtitle: string;
  skillName: string;
  skillDescription: string;
  back: TeacherBack;
  large?: boolean;
};

export function SkillCard({
  skillId,
  dimensionId,
  dimensionNumber,
  dimensionName,
  dimensionSubtitle,
  skillName,
  skillDescription,
  back,
  large = false,
}: SkillCardProps) {
  const t = useTranslations("card");
  const tA11y = useTranslations("a11y");
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const bg = DIMENSION_COLORS[dimensionId];
  const onColor = textOnDimension(dimensionId);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    try {
      if (!localStorage.getItem("idg-flip-hint-seen")) {
        setShowHint(true);
      }
    } catch {
      setShowHint(true);
    }
  }, []);

  const flip = useCallback(() => {
    setFlipped((f) => !f);
    if (showHint) {
      setShowHint(false);
      try {
        localStorage.setItem("idg-flip-hint-seen", "1");
      } catch {
        /* ignore */
      }
    }
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        /* ignore */
      }
    }
  }, [showHint]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flip();
    }
  };

  return (
    <div className={`relative w-full ${large ? "max-w-xl mx-auto" : ""}`}>
      {showHint && (
        <p className="mb-3 text-center text-sm font-light text-black/60 animate-fade-in">
          {t("flipHint")}
        </p>
      )}
      <div
        className={`card-scene ${large ? "min-h-[560px] sm:min-h-[600px]" : "min-h-[420px]"}`}
        style={{ perspective: reducedMotion ? undefined : "1200px" }}
      >
        <button
          type="button"
          className={`card-flipper relative w-full rounded-3xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${
            large ? "min-h-[560px] sm:min-h-[600px]" : "min-h-[420px]"
          } ${flipped ? "is-flipped" : ""} ${reducedMotion ? "card-reduced" : ""}`}
          style={{
            transformStyle: reducedMotion ? undefined : "preserve-3d",
            transition: reducedMotion
              ? "opacity 400ms ease"
              : "transform 600ms cubic-bezier(0.34, 1.45, 0.64, 1), box-shadow 600ms ease",
            boxShadow: flipped
              ? "0 18px 40px rgba(0,0,0,0.18)"
              : "0 8px 24px rgba(0,0,0,0.08)",
          }}
          onClick={flip}
          onKeyDown={onKeyDown}
          aria-pressed={flipped}
          aria-label={`${skillName}. ${flipped ? tA11y("flipped") : tA11y("notFlipped")}. ${t("flip")}`}
        >
          {/* FRONT */}
          <div
            className="card-face card-front absolute inset-0 flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8"
            style={{
              backgroundColor: bg,
              color: onColor,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              opacity: reducedMotion && flipped ? 0 : 1,
              pointerEvents: flipped ? "none" : "auto",
            }}
            aria-hidden={flipped}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <DimensionIcon
                dimensionId={dimensionId}
                className="h-12 w-12 text-white sm:h-14 sm:w-14"
              />
              <SkillMark skillId={skillId} color={onColor} className="h-9 w-9 opacity-80" />
            </div>
            <p className="text-xs font-light uppercase tracking-[0.14em] opacity-80">
              {t("dimensionOf", { number: dimensionNumber })} · {dimensionName}
            </p>
            <p className="mt-1 text-sm font-light opacity-90">{dimensionSubtitle}</p>
            <div className="my-4 h-px w-16 bg-current opacity-40" />
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {skillName}
            </h2>
            <p className="mt-4 flex-1 text-sm font-normal leading-relaxed opacity-95 sm:text-base">
              {skillDescription}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-current/30 px-3 py-1 text-xs font-light">
              {t("flip")}
              <span aria-hidden>↺</span>
            </span>
          </div>

          {/* BACK */}
          <div
            className="card-face card-back absolute inset-0 flex flex-col overflow-y-auto rounded-3xl bg-white p-6 sm:p-8"
            style={{
              color: IDG_COLORS.jetBlack,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: reducedMotion ? undefined : "rotateY(180deg)",
              borderLeft: `6px solid ${bg}`,
              opacity: reducedMotion ? (flipped ? 1 : 0) : 1,
              pointerEvents: flipped ? "auto" : "none",
            }}
            aria-hidden={!flipped}
          >
            <p className="text-xs font-light uppercase tracking-[0.14em]" style={{ color: bg }}>
              {dimensionName} · {skillName}
            </p>
            <BackSection
              title={t("forYou")}
              hint={t("forYouHint")}
              items={back.forYou}
              accent={bg}
            />
            <BackSection
              title={t("forClass")}
              hint={t("forClassHint")}
              items={back.forClass}
              accent={bg}
            />
            <BackSection
              title={t("inLesson")}
              hint={t("inLessonHint")}
              items={back.inLesson}
              accent={bg}
            />
            <span className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-black/15 px-3 py-1 text-xs font-light text-black/70">
              {t("flip")}
              <span aria-hidden>↺</span>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

function BackSection({
  title,
  hint,
  items,
  accent,
}: {
  title: string;
  hint: string;
  items: string[];
  accent: string;
}) {
  return (
    <section className="mt-4 first:mt-3">
      <h3 className="text-base font-bold" style={{ color: accent }}>
        {title}
      </h3>
      <p className="text-xs font-light text-black/50">{hint}</p>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm font-normal leading-snug text-black/85 before:mr-2 before:content-['·']"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Compact preview card linking to full skill view */
export function SkillCardPreview({
  href,
  skillId,
  dimensionId,
  skillName,
  skillDescription,
  index = 0,
}: {
  href: string;
  skillId: SkillId;
  dimensionId: DimensionId;
  skillName: string;
  skillDescription: string;
  index?: number;
}) {
  const bg = DIMENSION_COLORS[dimensionId];
  const onColor = textOnDimension(dimensionId);
  const t = useTranslations("skills");

  return (
    <Link
      href={href}
      className="skill-enter group flex flex-col rounded-3xl p-5 outline-offset-4 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
      style={{
        backgroundColor: bg,
        color: onColor,
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <DimensionIcon dimensionId={dimensionId} className="h-10 w-10 text-white" />
        <SkillMark skillId={skillId} color={onColor} className="h-8 w-8 opacity-80" />
      </div>
      <h3 className="text-lg font-bold leading-tight">{skillName}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm font-light leading-snug opacity-90">
        {skillDescription}
      </p>
      <span className="mt-4 text-xs font-light underline-offset-2 group-hover:underline">
        {t("openCard")}
      </span>
    </Link>
  );
}
