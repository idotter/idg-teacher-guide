import { getTranslations, setRequestLocale } from "next-intl/server";
import { SkillsBrowser } from "@/components/SkillsBrowser";
import type { AppLocale } from "@/i18n/routing";

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = loc as AppLocale;
  setRequestLocale(locale);
  const t = await getTranslations("skills");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-3 max-w-2xl font-light text-black/65">{t("lead")}</p>
      <div className="mt-8">
        <SkillsBrowser />
      </div>
    </div>
  );
}
