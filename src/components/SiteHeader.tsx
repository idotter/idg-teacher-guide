"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { InspiredMark } from "@/components/icons/DimensionIcon";
import { routing, type AppLocale } from "@/i18n/routing";

export function SiteHeader() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const tMeta = useTranslations("meta");
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/skills", label: t("skills") },
    { href: "/about", label: t("about") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#FAF7F5]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          <InspiredMark className="h-8 w-8" />
          <span className="text-sm sm:text-base">{tMeta("appName")}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-light transition-opacity hover:opacity-70 ${
                pathname === l.href ? "font-bold opacity-100" : "opacity-80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/draw"
            className="rounded-full bg-[#661a30] px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("drawCard")}
          </Link>
          <LanguageSwitcher locale={locale} />
        </nav>

        <button
          type="button"
          className="rounded-full border border-black/10 px-3 py-2 text-sm md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? tA11y("closeMenu") : tA11y("openMenu")}
        >
          {t("menu")}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-light"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/draw"
              onClick={() => setOpen(false)}
              className="rounded-full bg-[#661a30] px-4 py-2.5 text-center text-sm font-bold text-white"
            >
              {t("drawCard")}
            </Link>
            <LanguageSwitcher locale={locale} />
          </nav>
        </div>
      )}
    </header>
  );
}

function LanguageSwitcher({ locale }: { locale: AppLocale }) {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-1 text-sm font-light">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={`rounded-full px-2.5 py-1 uppercase ${
            l === locale ? "bg-black text-white font-bold" : "text-black/60 hover:text-black"
          }`}
          hrefLang={l}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
