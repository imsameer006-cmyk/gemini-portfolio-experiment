import type { Metadata } from "next";

type EnterPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Enter Password | Sameer Gautam",
  robots: { index: false, follow: false },
};

function getErrorMessage(error?: string) {
  if (error === "invalid") {
    return "That password did not match. Please try again.";
  }

  if (error === "config") {
    return "This site is temporarily unavailable. Please try again later.";
  }

  return null;
}

export default async function EnterPage({ searchParams }: EnterPageProps) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/";
  const errorMessage = getErrorMessage(params.error);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-warm-bg)] px-6 py-20 text-[var(--color-text)] md:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          opacity: 0.45,
        }}
      />

      <section className="relative z-10 w-full max-w-[420px] border-t border-[var(--color-border)] pt-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--color-text-accent)]">
          Private Portfolio
        </p>
        <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-[var(--color-text)]">
          Enter password
        </h1>
        <p className="mt-5 text-body-compact leading-relaxed text-[var(--color-text-secondary)]">
          This portfolio is currently shared by invitation. Enter the access password to continue.
        </p>

        <form action="/api/verify-password" method="post" className="mt-8 flex flex-col gap-4">
          <input type="hidden" name="next" value={nextPath} />
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--color-text-muted)]">
              Password
            </span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="min-h-12 rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-base text-[var(--color-text)] outline-none transition-colors duration-200 focus:border-[var(--color-focus-ring)]"
            />
          </label>

          {errorMessage && (
            <p className="text-body-compact leading-relaxed text-[var(--color-text-accent)]" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--color-text)] px-5 py-3 text-sm font-medium text-[var(--color-warm-bg)] transition-colors duration-200 hover:bg-[var(--color-accent-hover)]"
          >
            Continue
          </button>
        </form>
      </section>
    </main>
  );
}
