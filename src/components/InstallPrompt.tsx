"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { InspiredMark } from "@/components/icons/DimensionIcon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const t = useTranslations("install");
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(true);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("idg-install-dismissed")) return;
    } catch {
      /* ignore */
    }
    setDismissed(false);

    const ua = window.navigator.userAgent;
    const ios =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as Navigator & { standalone?: boolean }).standalone === true);
    if (standalone) {
      setDismissed(true);
      return;
    }
    setIsIos(ios);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (dismissed) return null;
  if (!deferred && !isIos) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem("idg-install-dismissed", "1");
    } catch {
      /* ignore */
    }
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    dismiss();
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md animate-fade-rise rounded-3xl border border-black/5 bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:inset-x-auto sm:right-6 sm:left-auto">
      <div className="flex gap-3">
        <InspiredMark className="h-11 w-11 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-bold">{t("title")}</p>
          <p className="mt-1 text-sm font-light text-black/70">{t("body")}</p>
          {isIos && !deferred ? (
            <p className="mt-2 text-xs font-light text-black/55">{t("iosHint")}</p>
          ) : null}
          <div className="mt-3 flex gap-2">
            {deferred ? (
              <button
                type="button"
                onClick={install}
                className="rounded-full bg-[#661a30] px-4 py-2 text-sm font-bold text-white"
              >
                {t("cta")}
              </button>
            ) : null}
            <button
              type="button"
              onClick={dismiss}
              className="rounded-full border border-black/10 px-4 py-2 text-sm font-light"
            >
              {t("dismiss")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
