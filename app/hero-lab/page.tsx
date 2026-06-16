import type { Metadata } from "next";
import { GeminiHeroSandbox } from "./_sandbox/GeminiHeroSandbox";
import { CollabHeroSandbox } from "./_sandbox/CollabHeroSandbox";

export const metadata: Metadata = {
  title: "Hero Banner Lab | Sameer Gautam",
  description: "LinkedIn profile banner compositions for the portfolio hero.",
  robots: { index: false, follow: false },
};

const COMPLEXITY_PATHS = [
  "M307 258C251 177 120 194 91 271C58 360 176 428 259 383C351 333 317 184 207 179C96 174 64 309 144 374C235 448 352 363 321 250C291 137 119 131 76 248C34 363 171 462 275 407C380 352 370 190 255 151C138 111 39 234 83 347C128 463 309 457 353 334C395 218 273 102 153 149C43 192 23 343 127 417C231 492 398 409 381 275C364 137 195 78 93 172C-8 265 33 441 165 472C298 504 424 391 383 254C343 119 166 70 66 188",
  "M329 260C268 211 171 215 123 272C68 337 105 427 195 431C293 435 359 342 318 250C276 156 146 141 82 223C17 306 56 421 161 456C269 492 382 408 377 294C371 171 238 88 123 142C6 197-17 354 75 442C168 531 337 522 405 405C474 286 400 132 272 103",
  "M312 263C232 244 149 277 129 344C105 422 186 474 262 441C350 403 366 292 303 228C241 164 126 178 80 259C31 344 74 446 171 475C276 506 397 430 398 315C399 204 302 100 190 121C78 143 19 263 58 370C98 482 241 532 343 472",
  "M317 258C245 304 130 293 83 220C30 139 87 48 194 69C299 90 360 207 310 294C259 384 126 391 58 312C-9 235 15 113 105 58C195 4 329 33 388 130C448 229 414 369 310 427",
  "M306 259C224 201 116 226 87 311C59 394 132 469 227 459C325 449 389 350 354 253C319 158 205 113 116 158C27 204 1 324 62 407C124 491 253 512 347 451",
  "M312 259C252 322 142 337 73 270C2 201 27 87 125 53C224 18 337 82 361 184C386 288 318 392 213 411C109 430 15 355 8 250",
];

const CORE_PATHS = [
  "M306 259C250 236 188 242 158 281C124 325 151 382 209 383C274 384 321 330 303 269C285 209 208 186 156 224C104 262 102 340 153 381C206 423 292 404 325 342C360 277 318 199 251 178C183 157 109 199 99 270",
  "M309 259C246 279 170 260 144 202C115 138 165 79 238 93C313 108 361 182 344 255C326 329 254 381 181 366C108 351 59 282 72 210",
];

const LIGHT_THREAD_PATH =
  "M94 274C133 219 215 304 286 242C334 201 250 150 188 206C125 264 207 343 293 292C351 257 335 210 291 234C247 259 285 303 338 275C353 268 363 262 370 260C392 260 414 260 436 260L1600 260";

const DARK_THREAD_PATH =
  "M94 274C133 219 215 304 286 242C334 201 250 150 188 206C125 264 207 343 293 292C351 257 335 210 291 234C247 259 285 303 338 275C353 268 363 262 370 260C392 260 414 260 436 260L720 260";

function LightClarityThread() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 520"
      fill="none"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="xMaxYMid meet"
    >
      <g
        stroke="#18171A"
        strokeLinecap="round"
        opacity="0.28"
        transform="translate(-56 0) scale(0.88 1)"
      >
        {COMPLEXITY_PATHS.map((path) => (
          <path key={path} d={path} strokeWidth="1.25" />
        ))}
      </g>

      <g
        stroke="#18171A"
        strokeLinecap="round"
        opacity="0.2"
        transform="translate(-56 0) scale(0.88 1)"
      >
        {CORE_PATHS.map((path) => (
          <path key={path} d={path} strokeWidth="0.95" />
        ))}
      </g>

      <path
        d={LIGHT_THREAD_PATH}
        stroke="#18171A"
        strokeLinecap="round"
        strokeWidth="1.45"
        opacity="0.5"
      />

      <g
        transform="translate(370 260)"
        stroke="#18171A"
        strokeLinecap="round"
        strokeWidth="3.5"
      >
        <line x1="0" y1="-11" x2="0" y2="11" />
        <line x1="-9.5" y1="-5.5" x2="9.5" y2="5.5" />
        <line x1="-9.5" y1="5.5" x2="9.5" y2="-5.5" />
      </g>
    </svg>
  );
}

function DarkClarityThread() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 396"
      fill="none"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="xMinYMid meet"
    >
      <g
        stroke="#3A271C"
        strokeLinecap="round"
        opacity="0.5"
        transform="translate(-60 -40) scale(0.95)"
      >
        {COMPLEXITY_PATHS.map((path) => (
          <path key={path} d={path} strokeWidth="1.25" />
        ))}
      </g>

      <g
        stroke="#5C3E2B"
        strokeLinecap="round"
        opacity="0.65"
        transform="translate(-60 -40) scale(0.95)"
      >
        {CORE_PATHS.map((path) => (
          <path key={path} d={path} strokeWidth="1.0" />
        ))}
      </g>

      <path
        d={DARK_THREAD_PATH}
        stroke="#C07B50"
        strokeLinecap="round"
        strokeWidth="1.75"
        opacity="0.9"
        transform="translate(0 -40)"
      />

      <g
        transform="translate(370 220)"
        stroke="#C07B50"
        strokeLinecap="round"
        strokeWidth="3"
        opacity="0.9"
      >
        <line x1="0" y1="-10" x2="0" y2="10" />
        <line x1="-8.5" y1="-5" x2="8.5" y2="5" />
        <line x1="-8.5" y1="5" x2="8.5" y2="-5" />
      </g>
    </svg>
  );
}

function SilverClarityThread() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 396"
      fill="none"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="xMinYMid meet"
    >
      <g
        stroke="#2E2D32"
        strokeLinecap="round"
        opacity="0.6"
        transform="translate(-60 -40) scale(0.95)"
      >
        {COMPLEXITY_PATHS.map((path) => (
          <path key={path} d={path} strokeWidth="1.25" />
        ))}
      </g>

      <g
        stroke="#475569"
        strokeLinecap="round"
        opacity="0.65"
        transform="translate(-60 -40) scale(0.95)"
      >
        {CORE_PATHS.map((path) => (
          <path key={path} d={path} strokeWidth="1.0" />
        ))}
      </g>

      <path
        d={DARK_THREAD_PATH}
        stroke="#CBD5E1"
        strokeLinecap="round"
        strokeWidth="1.75"
        opacity="0.95"
        transform="translate(0 -40)"
      />

      <g
        transform="translate(370 220)"
        stroke="#CBD5E1"
        strokeLinecap="round"
        strokeWidth="3"
        opacity="0.9"
      >
        <line x1="0" y1="-10" x2="0" y2="10" />
        <line x1="-8.5" y1="-5" x2="8.5" y2="5" />
        <line x1="-8.5" y1="5" x2="8.5" y2="-5" />
      </g>
    </svg>
  );
}

export default function HeroLabPage() {
  return (
    <section className="min-h-screen bg-[#0B0A0C] px-6 py-20 md:px-10">
      <div className="mx-auto w-full max-w-[1584px] flex flex-col gap-10">

        {/* ── Canvas 1: Light ───────────────────────────────────────────── */}
        <div>
          <div
            className="relative h-[396px] w-[1584px] max-w-full overflow-hidden border border-[#E6E3DD] bg-[#F9F8F5]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #E0DDD7 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          >
            <div className="absolute inset-0 bg-[#F9F8F5]/58" />

            <div className="absolute right-0 top-0 h-full w-[720px]">
              <LightClarityThread />
            </div>

            <div
              className="absolute right-0 top-0 h-full w-[720px] pointer-events-none"
              style={{
                background: "linear-gradient(to right, #F9F8F5 0%, transparent 38%)",
              }}
            />

            <div
              className="absolute top-0 bottom-0 flex items-center"
              style={{ left: "362px", width: "400px" }}
            >
              <div>
                <div className="mb-6 h-[2px] w-[44px] rounded-full bg-[#C07B50]" />
                <h1
                  className="font-[family-name:var(--font-instrument-serif)] italic leading-[0.93] text-[#18171A]"
                  style={{ fontSize: "50px" }}
                >
                  Building clarity
                  <br />
                  out of complexity.
                </h1>
                <p
                  className="mt-5 text-[#6A6764]"
                  style={{ fontSize: "16px", letterSpacing: "0.04em" }}
                >
                  Product Design&nbsp;&nbsp;·&nbsp;&nbsp;Enterprise
                  Systems&nbsp;&nbsp;·&nbsp;&nbsp;Workflow Design
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-[76px] right-[76px] h-px bg-[#E6E3DD]" />
          </div>
          <p className="mt-3 text-[11px] font-mono tracking-wider text-[#4A484D] uppercase">
            Canvas 1 — Light&nbsp;&nbsp;·&nbsp;&nbsp;1584 × 396 px&nbsp;&nbsp;·&nbsp;&nbsp;Safe area: 350px left, 120px right
          </p>
        </div>

        {/* ── Canvas 2: Dark ────────────────────────────────────────────── */}
        <div>
          <div
            id="canvas-2"
            className="relative h-[396px] w-[1584px] max-w-full overflow-hidden border border-[#221E1C] bg-[#121115]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #221E1C 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#121115] via-transparent to-[#1A191E]/30" />

            <div className="absolute top-0 h-full" style={{ left: "15%", width: "45%" }}>
              <DarkClarityThread />
            </div>

            <div
              className="absolute top-0 h-full pointer-events-none"
              style={{
                left: "5%",
                width: "45%",
                background: "linear-gradient(to right, transparent 60%, #121115 100%)",
              }}
            />

            <div
              className="absolute top-0 bottom-0 flex items-center justify-end text-right"
              style={{ right: "7.5%", width: "35%" }}
            >
              <div className="flex flex-col items-end">
                <div className="mb-6 h-[2px] w-[44px] rounded-full bg-[#C07B50]" />
                <h1
                  className="font-[family-name:var(--font-instrument-serif)] italic leading-[0.95] text-[#F5F3F1]"
                  style={{ fontSize: "52px" }}
                >
                  Building clarity
                  <br />
                  out of complexity.
                </h1>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#968E88]">
                  Product Design&nbsp;&nbsp;·&nbsp;&nbsp;Enterprise
                  Systems&nbsp;&nbsp;·&nbsp;&nbsp;Systems Thinking
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-[60px] right-[60px] h-px bg-[#221E1C]" />
          </div>
          <p className="mt-3 text-[11px] font-mono tracking-wider text-[#4A484D] uppercase">
            Canvas 2 — Dark&nbsp;&nbsp;·&nbsp;&nbsp;1584 × 396 px&nbsp;&nbsp;·&nbsp;&nbsp;Art left, copy right
          </p>
        </div>

        {/* ── Canvas 3: Silver / Platinum ───────────────────────────────── */}
        <div>
          <div
            id="canvas-3"
            className="relative h-[396px] w-[1584px] max-w-full overflow-hidden border border-[#222126] bg-[#121115]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #222126 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#121115] via-transparent to-[#1A191E]/30" />

            <div className="absolute top-0 h-full" style={{ left: "15%", width: "45%" }}>
              <SilverClarityThread />
            </div>

            <div
              className="absolute top-0 h-full pointer-events-none"
              style={{
                left: "5%",
                width: "45%",
                background: "linear-gradient(to right, transparent 60%, #121115 100%)",
              }}
            />

            <div
              className="absolute top-0 bottom-0 flex items-center justify-end text-right"
              style={{ right: "7.5%", width: "35%" }}
            >
              <div className="flex flex-col items-end">
                <div className="mb-6 h-[2px] w-[44px] rounded-full bg-[#CBD5E1]" />
                <h1
                  className="font-[family-name:var(--font-instrument-serif)] italic leading-[0.95] text-[#F3F4F6]"
                  style={{ fontSize: "52px" }}
                >
                  Building clarity
                  <br />
                  out of complexity.
                </h1>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#94A3B8]">
                  Product Design&nbsp;&nbsp;·&nbsp;&nbsp;Enterprise
                  Systems&nbsp;&nbsp;·&nbsp;&nbsp;Systems Thinking
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-[60px] right-[60px] h-px bg-[#222126]" />
          </div>
          <p className="mt-3 text-[11px] font-mono tracking-wider text-[#4A484D] uppercase">
            Canvas 3 — Silver / Platinum&nbsp;&nbsp;·&nbsp;&nbsp;1584 × 396 px&nbsp;&nbsp;·&nbsp;&nbsp;Art left, copy right
          </p>
        </div>

        {/* ── Project hero sandboxes ───────────────────────────────────────
            Isolated copies — see app/hero-lab/_sandbox/. Editing these files
            cannot affect production (no production page imports this folder).
            Structure/layers/IDs are 1:1 with the real components so a working
            change can be ported back verbatim. ────────────────────────────── */}
        <div>
          <p className="mb-3 text-[11px] font-mono tracking-wider text-[#4A484D] uppercase">
            Sandbox — Gemini Hero (Project 1)&nbsp;&nbsp;·&nbsp;&nbsp;isolated copy, safe to edit
          </p>
          <div className="overflow-hidden rounded-lg border border-[#2E2C27]">
            <GeminiHeroSandbox />
          </div>
        </div>

        <div>
          <p className="mb-3 text-[11px] font-mono tracking-wider text-[#4A484D] uppercase">
            Sandbox — Collabspace Hero (Project 2)&nbsp;&nbsp;·&nbsp;&nbsp;isolated copy, safe to edit
          </p>
          <div className="overflow-hidden rounded-lg border border-[#2E2C27]">
            <CollabHeroSandbox />
          </div>
        </div>

      </div>
    </section>
  );
}
