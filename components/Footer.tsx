export function FooterAsterisk() {
  return (
    <div className="flex h-[80px] w-[50px] items-center justify-center">
      <svg
        width="50"
        height="50"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[50px] w-[50px]"
        aria-hidden="true"
      >
        <defs>
          <radialGradient
            id="footerAsteriskMetallic"
            cx="0"
            cy="0"
            r="90"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#89B5CC" />
            <stop offset="55%" stopColor="#6497B1" />
            <stop offset="100%" stopColor="#426F8A" />
          </radialGradient>
        </defs>
        <path
          d="M255 145L243 212L190 185L223 234L110 205L205 258L160 300L230 262L230 365L257 262L345 325L282 250L390 130L278 222Z"
          fill="url(#footerAsteriskMetallic)"
          shapeRendering="geometricPrecision"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--footer-background-color)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-6">
        <div className="text-[var(--footer-logo-color)] mb-5 flex justify-center">
          <FooterAsterisk />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[var(--footer-copy-color)] text-xs">
            &copy; {year} Sameer Gautam. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/uxd-sameer/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--footer-link-color)] text-xs hover:text-[var(--footer-link-hover)] transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hi@withsameer.design"
              className="text-[var(--footer-link-color)] text-xs hover:text-[var(--footer-link-hover)] transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
