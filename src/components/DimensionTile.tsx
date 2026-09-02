import { DIMENSION_COLORS, textOnDimension } from "@/lib/colors";
import type { DimensionId } from "@/content/framework";
import { DimensionIcon } from "@/components/icons/DimensionIcon";
import { Link } from "@/i18n/navigation";

export function DimensionTile({
  id,
  number,
  name,
  subtitle,
  href,
  delayMs = 0,
}: {
  id: DimensionId;
  number: number;
  name: string;
  subtitle: string;
  href: string;
  delayMs?: number;
}) {
  const bg = DIMENSION_COLORS[id];
  const color = textOnDimension(id);

  return (
    <Link
      href={href}
      className="dimension-tile group relative flex min-h-[220px] flex-col items-center rounded-3xl px-4 py-8 text-center outline-offset-4 transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black active:scale-[0.98]"
      style={{
        backgroundColor: bg,
        color,
        animationDelay: `${delayMs}ms`,
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 999px color-mix(in srgb, ${bg} 85%, white)`,
          mixBlendMode: "overlay",
        }}
        aria-hidden
      />
      <DimensionIcon
        dimensionId={id}
        className="mb-5 h-14 w-14 text-white drop-shadow-sm sm:h-16 sm:w-16"
      />
      <h3 className="relative text-xl font-bold tracking-tight sm:text-2xl">
        {number} {name}
      </h3>
      <p className="relative mt-2 max-w-[16ch] text-sm font-light leading-snug opacity-95 sm:text-base">
        {subtitle}
      </p>
    </Link>
  );
}
