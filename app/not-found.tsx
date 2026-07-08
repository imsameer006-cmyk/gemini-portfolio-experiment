import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 pb-10 pt-[76px] text-center md:min-h-[80svh] md:px-10 md:pb-12 md:pt-[92px]">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--color-text-accent)]">
        404
      </p>
      <h1 className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-[#18171A]">
        This page fell outside the user flow.
      </h1>
      <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-[#6A6764]">
        The link you followed doesn&apos;t lead anywhere — but the rest of the site does.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#18171A] px-5 py-3 text-sm font-medium text-[#F9F8F5] transition-colors duration-200 hover:bg-[#C07B50]"
      >
        Back to home
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </section>
  );
}
