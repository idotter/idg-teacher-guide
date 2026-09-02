import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InstallPrompt } from "@/components/InstallPrompt";
import { ArcMotif } from "@/components/icons/DimensionIcon";
import type { Metadata, Viewport } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#661a30",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("appName"),
      template: `%s · ${t("appName")}`,
    },
    description: t("description"),
    applicationName: t("appName"),
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("shortName"),
    },
    icons: {
      icon: [
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tA11y = await getTranslations("a11y");

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#FAF7F5] text-black">
            <ArcMotif position="top-left" className="opacity-70" />
            <ArcMotif position="bottom-right" className="opacity-50" />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
            >
              {tA11y("skipToContent")}
            </a>
            <SiteHeader />
            <main id="main" className="page-fade relative z-10 flex-1">
              {children}
            </main>
            <SiteFooter />
            <InstallPrompt />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
