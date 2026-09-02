import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IDG im Unterricht",
    short_name: "IDG",
    description:
      "Inner Development Goals für den Unterrichtsalltag — 23 Kompetenzen als umdrehbare Karten.",
    start_url: "/de",
    scope: "/",
    display: "standalone",
    background_color: "#FAF7F5",
    theme_color: "#661a30",
    lang: "de",
    orientation: "any",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
