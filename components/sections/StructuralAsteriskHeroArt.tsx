"use client";

const SPOKE_ANGLES = [0, 60, 120, 180, 240, 300];

export default function StructuralAsteriskHeroArt({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={["pointer-events-none overflow-hidden", className].filter(Boolean).join(" ")}
    >
      <svg
        viewBox="-85.67 -92 184 184"
        width="100%"
        height="100%"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g shapeRendering="geometricPrecision">
          {SPOKE_ANGLES.map((angle) => (
            <rect
              key={angle}
              x="-15"
              y="-92"
              width="30"
              height="104"
              fill="#1C2B1D"
              transform={`rotate(${angle})`}
              shapeRendering="geometricPrecision"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
