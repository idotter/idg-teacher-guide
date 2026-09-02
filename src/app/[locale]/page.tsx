import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DIMENSIONS, tLocalized } from "@/content";
import { DimensionTile } from "@/components/DimensionTile";
import { InspiredMark } from "@/components/icons/DimensionIcon";
import type { AppLocale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = loc as AppLocale;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tMeta = await getTranslations("meta");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="relative mx-auto max-w-3xl text-center">
        <div className="mb-6 flex justify-center">
          <InspiredMark className="h-16 w-16 sm:h-20 sm:w-20" />
        </div>
        <p className="text-sm font-light uppercase tracking-[0.18em] text-black/55">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          {tMeta("appName")}
        </h1>
        <p className="mt-4 text-lg font-light leading-relaxed text-black/75 sm:text-xl">
          {t("title")}
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-black/65">
          {t("lead")}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/draw"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#661a30] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href="/skills"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-black/15 bg-white/60 px-6 py-3 text-sm font-light transition-colors hover:border-black/40"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("dimensionsHeading")}
          </h2>
          <p className="mt-2 font-light text-black/65">{t("dimensionsLead")}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {DIMENSIONS.map((d, i) => (
            <DimensionTile
              key={d.id}
              id={d.id}
              number={d.number}
              name={tLocalized(d.name, locale)}
              subtitle={tLocalized(d.subtitle, locale)}
              href={`/dimensions/${d.id}`}
              delayMs={i * 70}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
