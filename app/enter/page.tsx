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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#092212] px-6 py-20 text-[#D9EBE1] md:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle closest-side at 50% 34%, rgba(182,255,0,0.08), rgba(9,34,18,0) 58%), #092212",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(176,188,100,0.22) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          opacity: 0.38,
        }}
      />

      <section className="relative z-10 w-full max-w-[420px] border-t border-[#B0BC64]/35 pt-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#B6FF00]">
          Private Portfolio
        </p>
        <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight text-[#E8E3D5]">
          Enter password
        </h1>
        <p className="mt-5 text-body-compact leading-relaxed text-[#D9EBE1]/75">
          This portfolio is currently shared by invitation. Enter the access password to continue.
        </p>

        <form action="/api/verify-password" method="post" className="mt-8 flex flex-col gap-4">
          <input type="hidden" name="next" value={nextPath} />
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-widest text-[#B0BC64]">
              Password
            </span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="min-h-12 rounded-none border border-[#B0BC64]/40 bg-white/[0.045] px-4 text-base text-[#D9EBE1] shadow-none outline-none ring-0 transition-colors duration-200 focus:border-[#B6FF00] focus:bg-white/[0.065] focus:shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            />
          </label>

          {errorMessage && (
            <p className="text-body-compact leading-relaxed text-[#B6FF00]" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#B6FF00] px-5 py-3 text-sm font-semibold text-[#092212] transition-colors duration-200 hover:bg-[#D9EBE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B6FF00]"
          >
            Continue
          </button>
        </form>
      </section>
    </main>
  );
}
