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
        <path
          d="M 211.23 246.77 L 211.23 40 L 288.77 40 L 288.77 246.77 L 233.41 214.81 L 412.48 111.42 L 451.25 178.58 L 272.18 281.96 L 272.18 218.04 L 451.25 321.42 L 412.48 388.58 L 233.41 285.19 L 288.77 253.23 L 288.77 460 L 211.23 460 L 211.23 253.23 L 266.59 285.19 L 87.52 388.58 L 48.75 321.42 L 227.82 218.04 L 227.82 281.96 L 48.75 178.58 L 87.52 111.42 L 266.59 214.81 Z"
          fill="currentColor"
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
