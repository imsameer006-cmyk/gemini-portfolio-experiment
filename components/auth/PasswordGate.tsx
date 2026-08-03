"use client";

import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type PasswordGateProps = {
  errorMessage: string | null;
  nextPath: string;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

export default function PasswordGate({ errorMessage, nextPath }: PasswordGateProps) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const [error, setError] = useState(errorMessage);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const navigateToProject = (target: string) => {
    const doc = document as ViewTransitionDocument;

    if (doc.startViewTransition) {
      doc.startViewTransition(() => {
        router.push(target);
      });
      return;
    }

    router.push(target);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#092212] px-6 py-20 text-[#D9EBE1] md:px-10">
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

      <section
        ref={panelRef}
        data-password-panel-root="true"
        style={shouldReduceMotion ? undefined : { viewTransitionName: "password-panel" }}
        className="relative z-10 w-full max-w-[420px] border-t border-[#B0BC64]/35 pt-10"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#B6FF00]">
          Private Portfolio
        </p>
        <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight text-[#E8E3D5]">
          Enter password
        </h1>
        <p className="mt-5 text-body-compact leading-relaxed text-[#D9EBE1]/75">
          This portfolio is currently shared by invitation. Enter the access password to continue.
        </p>

        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={async (event) => {
            event.preventDefault();
            if (pending) return;

            setPending(true);
            setError(null);

            const form = event.currentTarget;
            const formData = new FormData(form);

            try {
              const response = await fetch("/api/verify-password", {
                method: "POST",
                body: formData,
                headers: {
                  "x-site-transition": "1",
                },
              });

              const payload = (await response.json()) as
                | { ok: true; redirectTo: string }
                | { ok: false; error: string };

              if (payload.ok === false) {
                setError(
                  payload.error === "config"
                    ? "This site is temporarily unavailable. Please try again later."
                    : "That password did not match. Please try again.",
                );
                setPending(false);
                form.reset();
                inputRef.current?.focus();
                return;
              }

              if (!response.ok) {
                setError("This site is temporarily unavailable. Please try again later.");
                setPending(false);
                inputRef.current?.focus();
                return;
              }

              navigateToProject(payload.redirectTo);
            } catch {
              setError("This site is temporarily unavailable. Please try again later.");
              setPending(false);
              inputRef.current?.focus();
            }
          }}
        >
          <input type="hidden" name="next" value={nextPath} />
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-widest text-[#B0BC64]">
              Password
            </span>
            <input
              ref={inputRef}
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              required
              disabled={pending}
              className="password-gate-input min-h-12 rounded-none border border-[#B0BC64]/40 bg-white/[0.045] px-4 text-base text-[#D9EBE1] shadow-none outline-none ring-0 transition-colors duration-200 focus:border-[#B6FF00] focus:bg-white/[0.065] focus:shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:opacity-60"
            />
          </label>

          {error && (
            <p className="text-body-compact leading-relaxed text-[#B6FF00]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#B6FF00] px-5 py-3 text-sm font-semibold text-[#092212] transition-colors duration-200 hover:bg-[#D9EBE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B6FF00] disabled:cursor-wait disabled:opacity-75"
          >
            Continue
          </button>
        </form>

        <style>{`
          .password-gate-input:focus,
          .password-gate-input:focus-visible {
            border-color: #B6FF00 !important;
            outline: none !important;
            box-shadow: none !important;
          }
        `}</style>
      </section>
    </section>
  );
}
