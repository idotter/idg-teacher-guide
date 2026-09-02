import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { InspiredMark } from "@/components/icons/DimensionIcon";
import { routing, type AppLocale } from "@/i18n/routing";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = loc as AppLocale;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const steps = t.raw("howSteps") as string[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center gap-3">
        <InspiredMark className="h-12 w-12" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold">{t("whatTitle")}</h2>
        <p className="mt-3 font-light leading-relaxed text-black/75">{t("whatBody")}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold">{t("howTitle")}</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 font-light leading-relaxed text-black/75">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold">{t("languageTitle")}</h2>
        <p className="mt-3 font-light text-black/75">{t("languageLead")}</p>
        <div className="mt-4 flex gap-2">
          {routing.locales.map((l) => (
            <Link
              key={l}
              href="/about"
              locale={l}
              className={`rounded-full px-4 py-2 text-sm uppercase ${
                l === locale ? "bg-black font-bold text-white" : "border border-black/10 font-light"
              }`}
            >
              {l}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold">{t("brandTitle")}</h2>
        <p className="mt-3 font-light leading-relaxed text-black/75">{t("brandBody")}</p>
      </section>

      <section className="rounded-3xl bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold">{t("licenseTitle")}</h2>
        <p className="mt-3 font-light leading-relaxed text-black/75">
          {t("inspired")}{" "}
          <a
            href="https://innerdevelopmentgoals.org"
            className="underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://innerdevelopmentgoals.org
          </a>
        </p>
        <p className="mt-3 font-light leading-relaxed text-black/75">{t("frameworkNote")}</p>
        <p className="mt-3 font-light text-black/60">{t("nonCommercial")}</p>
      </section>
    </div>
  );
}
