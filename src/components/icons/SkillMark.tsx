import type { SkillId } from "@/content/framework";

/** Simple geometric skill marks inspired by IDG slide language (original SVGs). */
export function SkillMark({
  skillId,
  className = "h-10 w-10",
  color = "currentColor",
}: {
  skillId: SkillId;
  className?: string;
  color?: string;
}) {
  const props = {
    className,
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    "aria-hidden": true as const,
  };

  switch (skillId) {
    case "innerer-kompass":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M32 12c8 8 8 20 0 28M32 12c-8 8-8 20 0 28M12 32c8-8 20-8 28 0M12 32c8 8 20 8 28 0" />
        </svg>
      );
    case "integritaet-authentizitaet":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="15" />
          <circle cx="32" cy="32" r="8" />
          <circle cx="32" cy="32" r="2" fill={color} stroke="none" />
        </svg>
      );
    case "offenheit-lernbereitschaft":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="3" fill={color} stroke="none" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 12;
            const x1 = 32 + Math.cos(a) * 8;
            const y1 = 32 + Math.sin(a) * 8;
            const x2 = 32 + Math.cos(a) * 20;
            const y2 = 32 + Math.sin(a) * 20;
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} />
                <circle cx={x2} cy={y2} r="1.5" fill={color} stroke="none" />
              </g>
            );
          })}
        </svg>
      );
    case "selbsterkenntnis":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => {
              const x = 16 + col * 8;
              const y = 16 + row * 8;
              const isCenter = row === 2 && col === 2;
              return (
                <circle
                  key={`${row}-${col}`}
                  cx={x}
                  cy={y}
                  r={isCenter ? 2.5 : 1.2}
                  fill={color}
                  stroke="none"
                />
              );
            }),
          )}
        </svg>
      );
    case "gegenwaertigkeit":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="12" />
          <circle cx="32" cy="32" r="4" fill={color} stroke="none" />
        </svg>
      );
    case "kritisches-denken":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M20 40 L28 24 L36 36 L44 20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "bewusstsein-komplexitaet":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="22" cy="28" r="5" />
          <circle cx="40" cy="24" r="4" />
          <circle cx="38" cy="40" r="6" />
          <path d="M26 30 L36 26 M36 28 L36 36 M26 32 L34 38" />
        </svg>
      );
    case "perspektivische-faehigkeiten":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M18 32h28M32 18v28" />
          <circle cx="32" cy="32" r="8" />
        </svg>
      );
    case "sinnstiftung":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M18 40c6-12 10-16 14-16s8 4 14 16" />
          <path d="M22 28h20" />
        </svg>
      );
    case "langfristige-orientierung":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M18 40 L28 28 L36 34 L46 18" strokeLinecap="round" />
          <circle cx="46" cy="18" r="2" fill={color} stroke="none" />
        </svg>
      );
    case "wertschaetzung":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M32 42 L20 28 a7 7 0 0 1 12-7 a7 7 0 0 1 12 7z" fill={color} stroke="none" opacity="0.9" />
        </svg>
      );
    case "verbundenheit":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="24" cy="32" r="8" />
          <circle cx="40" cy="32" r="8" />
        </svg>
      );
    case "bescheidenheit":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M22 38c4-10 8-14 10-14s6 4 10 14" />
          <circle cx="32" cy="24" r="3" />
        </svg>
      );
    case "einfuehlungsvermoegen":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M20 34c0-6 5-10 12-10s12 4 12 10c0 8-12 14-12 14s-12-6-12-14z" />
        </svg>
      );
    case "kommunikation":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M20 28h16a4 4 0 0 1 4 4v6H24l-4 4V28z" />
          <path d="M28 24h16a4 4 0 0 1 4 4v2" opacity="0.6" />
        </svg>
      );
    case "mitgestaltung":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="24" cy="30" r="5" />
          <circle cx="40" cy="30" r="5" />
          <circle cx="32" cy="42" r="5" />
          <path d="M27 33 L30 39 M37 33 L34 39 M29 30 H35" />
        </svg>
      );
    case "inklusive-denkweise":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="10" />
          <circle cx="22" cy="24" r="4" />
          <circle cx="44" cy="26" r="4" />
          <circle cx="24" cy="42" r="4" />
          <circle cx="42" cy="40" r="4" />
        </svg>
      );
    case "vertrauen":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M22 32l6 6 14-16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "mobilisierung":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M32 18v20M24 30l8-12 8 12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 44h20" />
        </svg>
      );
    case "mut":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M32 16l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" fill={color} stroke="none" opacity="0.85" />
        </svg>
      );
    case "kreativitaet":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M32 18c8 6 10 14 6 22-2 4-6 6-6 6s-4-2-6-6c-4-8-2-16 6-22z" />
          <path d="M32 46v4" />
        </svg>
      );
    case "optimismus":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="10" />
          <path d="M32 12v4M32 48v4M12 32h4M48 32h4M18 18l3 3M43 43l3 3M46 18l-3 3M21 43l-3 3" />
        </svg>
      );
    case "beharrlichkeit":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <path d="M20 40c4-2 8-4 12-4s8 2 12 4" />
          <path d="M20 32c4-2 8-4 12-4s8 2 12 4" />
          <path d="M20 24c4-2 8-4 12-4s8 2 12 4" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
        </svg>
      );
  }
}
