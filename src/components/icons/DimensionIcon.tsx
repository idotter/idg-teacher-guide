import type { DimensionId } from "@/content/framework";

type IconProps = {
  className?: string;
  title?: string;
};

/** White geometric dimension icons matching the official IDG overview language. */
export function DimensionIcon({
  dimensionId,
  className = "h-16 w-16",
  title,
}: IconProps & { dimensionId: DimensionId }) {
  const common = {
    className,
    viewBox: "0 0 100 100",
    role: title ? ("img" as const) : ("presentation" as const),
    "aria-hidden": title ? undefined : true,
    "aria-label": title,
  };

  switch (dimensionId) {
    case "sein":
      return (
        <svg {...common}>
          {title ? <title>{title}</title> : null}
          <circle cx="50" cy="50" r="38" fill="currentColor" />
        </svg>
      );
    case "denken":
      return (
        <svg {...common}>
          {title ? <title>{title}</title> : null}
          <polygon
            fill="currentColor"
            points="50,8 78,20 92,50 78,80 50,92 22,80 8,50 22,20"
          />
        </svg>
      );
    case "beziehung":
      return (
        <svg {...common}>
          {title ? <title>{title}</title> : null}
          <path
            fill="currentColor"
            d="M50 22c8 0 14 6 14 14 0 5-2.5 9-6.5 11.5C65 50 70 55 70 62c0 8-6.5 14-14.5 14-5 0-9-2-11.5-5.5C41.5 73 37 76 32 76c-8 0-14-6.5-14-14.5 0-5 2.5-9.5 6.5-12C20 47 16 41.5 16 35c0-8 6-14 14-14 5 0 9.5 2.5 12 6.5C44.5 24.5 45.5 22 50 22z"
          />
        </svg>
      );
    case "zusammenarbeit":
      return (
        <svg {...common}>
          {title ? <title>{title}</title> : null}
          <path
            fill="currentColor"
            d="M50 12c18 18 28 32 28 48 0 14-12 26-28 26S22 74 22 60c0-16 10-30 28-48z"
          />
        </svg>
      );
    case "handeln":
      return (
        <svg {...common}>
          {title ? <title>{title}</title> : null}
          <polygon
            fill="currentColor"
            points="18,28 62,12 88,50 62,88 18,72"
          />
        </svg>
      );
    default:
      return null;
  }
}

/** Concentric 5-ring mark — Inspired by IDG, for PWA / footer (not official lockup). */
export function InspiredMark({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Inspired by Inner Development Goals"
    >
      <circle cx="50" cy="50" r="46" fill="#661a30" />
      <circle cx="50" cy="50" r="37" fill="#ff7e2a" />
      <circle cx="50" cy="50" r="28" fill="#ef4136" />
      <circle cx="50" cy="50" r="19" fill="#e585a1" />
      <circle cx="50" cy="50" r="10" fill="#d4b88c" />
    </svg>
  );
}

/** Decorative partial arcs for atmosphere. */
export function ArcMotif({
  className = "",
  position = "top-left",
}: {
  className?: string;
  position?: "top-left" | "bottom-right";
}) {
  const colors = ["#d4b88c", "#e585a1", "#ef4136", "#ff7e2a", "#661a30"];
  const isTL = position === "top-left";
  return (
    <svg
      className={`pointer-events-none absolute ${className}`}
      viewBox="0 0 200 200"
      aria-hidden
      style={
        isTL
          ? { top: -40, left: -40, width: 220, height: 220 }
          : { bottom: -40, right: -40, width: 220, height: 220 }
      }
    >
      {colors.map((c, i) => (
        <circle
          key={c}
          cx={isTL ? 0 : 200}
          cy={isTL ? 0 : 200}
          r={40 + i * 22}
          fill="none"
          stroke={c}
          strokeWidth="14"
          opacity={0.35 - i * 0.04}
        />
      ))}
    </svg>
  );
}
