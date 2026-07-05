"use client";

import { useEffect, useRef } from "react";

export interface Annotation {
  x: number;       // 0–100  % from left edge of image
  y: number;       // 0–100  % from top  edge of image
  label: string;
  detail?: string;
}

interface Props {
  src: string;
  alt: string;
  annotations?: Annotation[];
  caption?: string;
}

// Inject shimmer keyframe once, at runtime — bypasses Turbopack CSS pipeline
function ensureKeyframes() {
  if (typeof window === "undefined") return;
  if (document.getElementById("ann-shimmer-kf")) return;
  const style = document.createElement("style");
  style.id = "ann-shimmer-kf";
  style.textContent = `
    @keyframes ann-sweep {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
  `;
  document.head.appendChild(style);
}

export function AnnotatedImage({ src, alt, annotations = [], caption }: Props) {
  const legendRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    ensureKeyframes();

    const el = legendRef.current;
    if (!el || annotations.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // Stagger shimmer across each number
        const numbers = el.querySelectorAll<HTMLElement>("[data-ann-num]");
        numbers.forEach((num, i) => {
          setTimeout(() => {
            // Apply shimmer gradient + animation inline
            num.style.setProperty("background-image",
              "linear-gradient(90deg, #C07B50 0%, #E8A87C 40%, #fff8f2 50%, #E8A87C 60%, #C07B50 100%)");
            num.style.setProperty("background-size", "200% auto");
            num.style.setProperty("background-clip", "text");
            num.style.setProperty("-webkit-background-clip", "text");
            num.style.setProperty("-webkit-text-fill-color", "transparent");
            num.style.setProperty("animation", "ann-sweep 0.75s ease-in-out forwards");

            // Reset after animation so state is clean
            num.addEventListener(
              "animationend",
              () => {
                num.style.removeProperty("background-image");
                num.style.removeProperty("background-size");
                num.style.removeProperty("background-clip");
                num.style.removeProperty("-webkit-background-clip");
                num.style.removeProperty("-webkit-text-fill-color");
                num.style.removeProperty("animation");
              },
              { once: true }
            );
          }, i * 140);
        });

        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [annotations.length]);

  return (
    <figure style={{ margin: 0 }}>

      {/* ── Image + numbered badge overlay ─────────────────── */}
      <div
        style={{
          position: "relative",
          display: "block",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #E6E3DD",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{ display: "block", width: "100%", height: "auto" }}
        />

        {annotations.map((ann, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${ann.x}%`,
              top:  `${ann.y}%`,
              transform: "translate(-50%, -50%)",
              width:  "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#C07B50",
              color: "#fff",
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "var(--font-sans, system-ui, sans-serif)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              letterSpacing: 0,
              userSelect: "none",
              boxShadow: "0 0 0 2px #fff, 0 2px 8px rgba(0,0,0,0.20)",
              zIndex: 2,
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* ── Caption ────────────────────────────────────────── */}
      {caption && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "11px",
            color: "#6E6D69",
            textAlign: "center",
            lineHeight: 1.5,
            letterSpacing: "0.01em",
          }}
        >
          {caption}
        </p>
      )}

      {/* ── Annotation legend ──────────────────────────────── */}
      {annotations.length > 0 && (
        <ol
          ref={legendRef}
          style={{
            margin: "24px 0 0",
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {annotations.map((ann, i) => (
            <li
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}
            >
              {/* Large editorial display number */}
              <span
                data-ann-num
                aria-label={`Annotation ${i + 1}`}
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-display, Georgia, serif)",
                  fontStyle: "italic",
                  fontSize: "36px",
                  fontWeight: 400,
                  lineHeight: 1,
                  // Stronger copper — was too faded before
                  color: "#C07B50",
                  opacity: 0.72,
                  minWidth: "36px",
                  paddingTop: "2px",
                  userSelect: "none",
                }}
              >
                0{i + 1}
              </span>

              {/* Label + detail */}
              <div style={{ paddingTop: "4px" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#18171A",
                    lineHeight: 1.4,
                  }}
                >
                  {ann.label}
                </p>
                {ann.detail && (
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "12px",
                      color: "#6A6764",
                      lineHeight: 1.55,
                    }}
                  >
                    {ann.detail}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </figure>
  );
}
