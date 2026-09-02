/** Official IDG Brandguide 2.0 colors — do not approximate. */
export const IDG_COLORS = {
  being: "#d4b88c",
  thinking: "#e585a1",
  relating: "#ef4136",
  collaborating: "#ff7e2a",
  acting: "#661a30",
  lightGrey: "#FAF7F5",
  jetBlack: "#000000",
  white: "#FFFFFF",
} as const;

export type DimensionColorKey = keyof Pick<
  typeof IDG_COLORS,
  "being" | "thinking" | "relating" | "collaborating" | "acting"
>;

export const DIMENSION_COLORS: Record<
  "sein" | "denken" | "beziehung" | "zusammenarbeit" | "handeln",
  string
> = {
  sein: IDG_COLORS.being,
  denken: IDG_COLORS.thinking,
  beziehung: IDG_COLORS.relating,
  zusammenarbeit: IDG_COLORS.collaborating,
  handeln: IDG_COLORS.acting,
};

/** Text on dimension color: white on burgundy/red/orange; dark on beige/pink for contrast */
export function textOnDimension(dimensionId: string): string {
  if (dimensionId === "sein" || dimensionId === "denken") {
    return IDG_COLORS.jetBlack;
  }
  return IDG_COLORS.white;
}
