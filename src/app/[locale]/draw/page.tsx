"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { SKILLS } from "@/content";

export default function DrawPage() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const idx = Math.floor(Math.random() * SKILLS.length);
    const skillId = SKILLS[idx]!.id;
    router.replace(`/skills/${skillId}`);
  }, [router, locale]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4">
      <div className="h-10 w-10 animate-pulse rounded-full bg-[#661a30]/30" aria-hidden />
    </div>
  );
}
