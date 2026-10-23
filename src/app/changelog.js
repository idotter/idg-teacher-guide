// Was sich an der App geändert hat. Den neusten Eintrag oben anfügen.
// `id` ist eindeutig und sortierbar. `card` ist optional: dann bietet das
// Sheet «Karte ansehen». Fehlt eine Übersetzung, gilt Deutsch.

export const CHANGELOG = [
  {
    id: '2026-10-23',
    items: {
      de: [
        'Die App weist dich hin, wenn eine neue Version bereitsteht. Du lädst neu, wenn es dir passt.',
        'Was sich geändert hat, steht hier: einmal nach dem Update und jederzeit unter «Einstellungen».',
      ],
      en: [
        'The app lets you know when a new version is ready. You reload when it suits you.',
        'What has changed is listed here: once after the update, and anytime in Settings.',
      ],
      fr: [
        "L'application signale qu'une nouvelle version est prête. Vous rechargez quand cela vous convient.",
        'Ce qui a changé est indiqué ici : une fois après la mise à jour, et à tout moment dans les réglages.',
      ],
      es: [
        'La aplicación avisa cuando hay una versión nueva. Recargas cuando te venga bien.',
        'Lo que ha cambiado aparece aquí: una vez tras la actualización y, cuando quieras, en Ajustes.',
      ],
      it: [
        "L'app avvisa quando è pronta una nuova versione. Ricarichi quando ti fa comodo.",
        "Qui trovi che cosa è cambiato: una volta dopo l'aggiornamento e, quando vuoi, in Impostazioni.",
      ],
      sv: [
        'Appen meddelar när en ny version är klar. Du laddar om när det passar.',
        'Vad som ändrats står här: en gång efter uppdateringen och när som helst under Inställningar.',
      ],
    },
  },
]

/** Ungesehene Einträge, neuste zuerst. Unbekannte oder fehlende id: alle. */
export function pendingNews(entries, seenId) {
  if (!Array.isArray(entries) || entries.length === 0) return []
  if (seenId == null) return entries.slice()
  const idx = entries.findIndex((entry) => entry.id === seenId)
  if (idx < 0) return entries.slice()
  return entries.slice(0, idx)
}

export function newsLines(entry, lang) {
  const items = entry?.items || {}
  return items[lang] || items.de || []
}
