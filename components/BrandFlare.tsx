import { useId } from "react";

interface BrandFlareProps {
  className?: string;
}

export function BrandFlare({ className = "w-6 h-6" }: BrandFlareProps) {
  const gradientId = useId();
  const glowId = `flareCoreGlow-${gradientId}`;

  return (
    <svg
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid meet"
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="25%" stopColor="#B6FF00" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#B6FF00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#B6FF00" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft core glow */}
      <circle cx="250" cy="250" r="70" fill={`url(#${glowId})`} />

      {/* Primary vertical & horizontal needles */}
      <g fill="#B6FF00">
        <path d="M 250 10 L 254 250 L 250 490 L 246 250 Z" />
        <path d="M 10 250 L 250 246 L 490 250 L 250 254 Z" />
      </g>

      {/* Secondary diagonal needles */}
      <g fill="#B6FF00" opacity="0.75">
        <path d="M 120 120 L 250 247 L 380 380 L 250 253 Z" />
        <path d="M 120 380 L 250 253 L 380 120 L 250 247 Z" />
      </g>

      {/* Bright white center spark */}
      <circle cx="250" cy="250" r="4" fill="#FFFFFF" />
    </svg>
  );
}
