import { getTranslations } from "next-intl/server";
import { InspiredMark } from "@/components/icons/DimensionIcon";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="mt-auto border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-xl items-start gap-3">
          <InspiredMark className="mt-0.5 h-9 w-9 shrink-0" />
          <div>
            <p className="text-sm font-bold">{t("inspiredBy")}</p>
            <p className="mt-1 text-sm font-light leading-relaxed text-black/70">
              {t("inspiredText")}{" "}
              <a
                href="https://innerdevelopmentgoals.org"
                className="underline underline-offset-2"
                rel="noopener noreferrer"
                target="_blank"
              >
                innerdevelopmentgoals.org
              </a>
            </p>
            <p className="mt-2 text-sm font-light text-black/60">
              {t("frameworkUnchanged")} · {t("nonCommercial")}
            </p>
          </div>
        </div>
        <Link href="/about" className="text-sm font-light underline underline-offset-2">
          {tNav("about")}
        </Link>
      </div>
    </footer>
  );
}
