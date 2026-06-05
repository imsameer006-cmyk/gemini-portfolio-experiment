export default function GeminiThumbnail() {
  return (
    <svg
      viewBox="0 0 460 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <filter id="gemini-node-shadow" x="-40" y="-40" width="540" height="336" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#18171A" floodOpacity="0.08" />
        </filter>
        <filter id="gemini-route-shadow" x="-24" y="-24" width="508" height="304" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#18171A" floodOpacity="0.08" />
        </filter>
      </defs>

      <rect width="460" height="256" fill="#EAF0EF" />

      <g filter="url(#gemini-route-shadow)">
        <path
          d="M76 178C138 174 165 128 211 119C265 109 305 75 378 72"
          stroke="#D8D3C9"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M76 178C138 174 165 128 211 119C265 109 305 75 378 72"
          stroke="#477C6C"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      <g filter="url(#gemini-node-shadow)">
        <circle cx="76" cy="178" r="24" fill="#FFFFFF" stroke="#E6E3DD" strokeWidth="1.25" />
        <path d="M67 164H80L87 171V190H67V164Z" stroke="#6A6764" strokeWidth="1.35" strokeLinejoin="round" />
        <path d="M80 164V171H87" stroke="#6A6764" strokeWidth="1.35" strokeLinejoin="round" />
        <path d="M72 177H81" stroke="#9C9A95" strokeWidth="1" strokeLinecap="round" />
        <path d="M72 182H78" stroke="#9C9A95" strokeWidth="1" strokeLinecap="round" />
      </g>
      <text x="76" y="220" fontFamily="var(--font-geist-sans), system-ui, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="0.08em" fill="#3A3836" textAnchor="middle">
        DRAFT
      </text>

      <g filter="url(#gemini-node-shadow)">
        <circle cx="211" cy="119" r="32" fill="#F9F8F5" stroke="#C07B50" strokeWidth="1.5" />
        <circle cx="208.5" cy="116.5" r="8.5" stroke="#C07B50" strokeWidth="2" />
        <path d="M215 123L223 131" stroke="#C07B50" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      <text x="211" y="166" fontFamily="var(--font-geist-sans), system-ui, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="0.08em" fill="#405F56" textAnchor="middle">
        PRE-CHECK
      </text>

      <circle cx="378" cy="72" r="58" stroke="#C2D4D1" strokeWidth="1.2" opacity="0.68" />
      <circle cx="378" cy="72" r="77" stroke="#C2D4D1" strokeWidth="1" opacity="0.35" />
      <g filter="url(#gemini-node-shadow)">
        <circle cx="378" cy="72" r="38" fill="#3A7A54" />
        <path d="M363 72L374 83L395 59" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="378" y="134" fontFamily="var(--font-geist-sans), system-ui, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="0.08em" fill="#405F56" textAnchor="middle">
        FEASIBILITY
      </text>
    </svg>
  );
}
