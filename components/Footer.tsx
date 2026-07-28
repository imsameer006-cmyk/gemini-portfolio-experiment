import { BrandFlare } from "./BrandFlare";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--footer-background-color)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-6">
        <div className="mb-5 flex justify-center">
          <BrandFlare className="w-10 h-10 md:w-12 md:h-12" />
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
