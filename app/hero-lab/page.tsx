import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero Banner Lab | Sameer Gautam",
  description: "Static banner composition for the portfolio hero.",
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

const PRIMARY_THREAD_PATH =
  "M94 274C133 219 215 304 286 242C334 201 250 150 188 206C125 264 207 343 293 292C351 257 335 210 291 234C247 259 285 303 338 275C353 268 363 262 370 260C399 260 395 205 423 208C455 212 428 292 481 298C525 303 508 260 552 265C605 271 658 268 700 260";

function StaticClarityThread() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 520"
      fill="none"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        stroke="#18171A"
        strokeLinecap="round"
        opacity="0.25"
        transform="translate(-56 0) scale(0.88 1)"
      >
        {COMPLEXITY_PATHS.map((path) => (
          <path key={path} d={path} strokeWidth="1.25" />
        ))}
      </g>

      <g
        stroke="#18171A"
        strokeLinecap="round"
        opacity="0.18"
        transform="translate(-56 0) scale(0.88 1)"
      >
        {CORE_PATHS.map((path) => (
          <path key={path} d={path} strokeWidth="0.95" />
        ))}
      </g>

      <path
        d={PRIMARY_THREAD_PATH}
        stroke="#18171A"
        strokeLinecap="round"
        strokeWidth="1.45"
        opacity="0.5"
      />

      <path
        d="M370 238C370.3 252 370.3 268 370 282"
        stroke="#C07B50"
        strokeLinecap="round"
        strokeWidth="5"
        opacity="0.72"
      />

      <g transform="translate(370 260)">
        <circle r="15" fill="#C07B50" stroke="#F9F8F5" strokeWidth="1.8" />
        {Array.from({ length: 4 }).map((_, i) => (
          <rect
            key={i}
            x="-2.2"
            y="-10.2"
            width="4.4"
            height="9.6"
            rx="0.6"
            fill="#F9F8F5"
            transform={`rotate(${i * 90})`}
          />
        ))}
        <circle r="3.2" fill="#F9F8F5" />
      </g>
    </svg>
  );
}

export default function HeroLabPage() {
  return (
    <section className="min-h-screen bg-[#F9F8F5] px-6 py-20 md:px-10">
      <div className="mx-auto w-full max-w-[1584px]">
        <div
          className="relative h-[396px] w-[1584px] max-w-full overflow-hidden border border-[#E6E3DD] bg-[#F9F8F5]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #E6E3DD 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="absolute inset-0 bg-[#F9F8F5]/50" />

          <div className="relative z-10 grid h-full grid-cols-[minmax(0,1fr)_520px] items-center gap-10 px-[76px]">
            <div>
              <h1 className="max-w-[790px] font-[family-name:var(--font-instrument-serif)] text-[78px] italic leading-[0.98] text-[#18171A]">
                Building clarity out of complexity.
              </h1>
              <p className="mt-7 max-w-[820px] text-[23px] leading-relaxed text-[#6A6764]">
                I design products that work for people and perform for business.
              </p>
            </div>

            <div className="relative h-[300px] w-[520px] justify-self-end">
              <StaticClarityThread />
            </div>
          </div>

          <div className="absolute bottom-0 left-[76px] right-[76px] h-px bg-[#E6E3DD]" />
        </div>
      </div>
    </section>
  );
}
