export default function GeminiThumbnail() {
  return (
    <svg
      viewBox="0 0 460 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="460" height="256" fill="#EAF0EF" />

      <g style={{ filter: "drop-shadow(0 5px 4px rgba(24,23,26,0.08))" }}>
        <path
          d="M76 178L227 125L378 72"
          stroke="#D8D3C9"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M76 178L227 125L378 72"
          stroke="#477C6C"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      <g style={{ filter: "drop-shadow(0 10px 12px rgba(24,23,26,0.08))" }}>
        <circle cx="76" cy="178" r="24" fill="#FFFFFF" stroke="#E6E3DD" strokeWidth="1.25" />
        <path d="M67 164H80L87 171V190H67V164Z" stroke="#6A6764" strokeWidth="1.35" strokeLinejoin="round" />
        <path d="M80 164V171H87" stroke="#6A6764" strokeWidth="1.35" strokeLinejoin="round" />
        <path d="M72 177H81" stroke="#9C9A95" strokeWidth="1" strokeLinecap="round" />
        <path d="M72 182H78" stroke="#9C9A95" strokeWidth="1" strokeLinecap="round" />
      </g>
      <text x="76" y="220" fontFamily="var(--font-geist-sans), system-ui, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="0.08em" fill="#6A6764" textAnchor="middle">
        DRAFT
      </text>

      <g style={{ filter: "drop-shadow(0 10px 12px rgba(24,23,26,0.08))" }}>
        <circle cx="227" cy="125" r="24" fill="#FFFFFF" stroke="#E6E3DD" strokeWidth="1.25" />
        <circle cx="224.5" cy="122.5" r="8.5" stroke="#6A6764" strokeWidth="1.35" />
        <path d="M231 129L239 137" stroke="#6A6764" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <text x="227" y="166" fontFamily="var(--font-geist-sans), system-ui, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="0.08em" fill="#6A6764" textAnchor="middle">
        PRE-CHECK
      </text>

      <g style={{ filter: "drop-shadow(0 10px 12px rgba(24,23,26,0.08))" }}>
        <circle cx="378" cy="72" r="32" fill="#DCE8E4" stroke="#477C6C" strokeWidth="2.4" />
        <path d="M363 72L374 83L395 59" stroke="#477C6C" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="378" y="134" fontFamily="var(--font-geist-sans), system-ui, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="0.08em" fill="#405F56" textAnchor="middle">
        FEASIBILITY
      </text>
    </svg>
  );
}
