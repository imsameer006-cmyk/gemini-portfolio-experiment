import { AnnotatedImage } from "@/components/ui/AnnotatedImage";

export default function DemoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F9F8F5",
        padding: "80px 0",
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6E6D69", marginBottom: "12px" }}>
          Component Demo
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display, Georgia, serif)",
            fontStyle: "italic",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 400,
            color: "#18171A",
            margin: "0 0 8px",
            lineHeight: 1.2,
          }}
        >
          Annotated Image
        </h1>
        <p style={{ fontSize: "15px", color: "#6A6764", marginBottom: "56px", lineHeight: 1.6 }}>
          Numbered callout badges on the image, matched to a clean legend below. Fully editable, sharp at any size.
        </p>

        {/* ── Demo 1 — with annotations ──────────────────────── */}
        <section style={{ marginBottom: "64px" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "#CECAC2", marginBottom: "20px" }}>
            With annotations
          </p>

          <AnnotatedImage
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80"
            alt="Dashboard UI demo"
            caption="Module status panel — Short Flow lifecycle view"
            annotations={[
              {
                x: 18,
                y: 22,
                label: "Workflow stage indicator",
                detail: "Persistent status badge — color, icon, and text label combined so state is never ambiguous.",
              },
              {
                x: 62,
                y: 38,
                label: "Assigned reviewer",
                detail: "Shows who currently owns the next action, updated automatically on self-assignment.",
              },
              {
                x: 40,
                y: 68,
                label: "Locked edit state",
                detail: "While a module is under review, editing is disabled with an explanation rather than a silent lock.",
              },
              {
                x: 80,
                y: 78,
                label: "Primary CTA",
                detail: "Contextual — changes between 'Assign to me', 'Approve', and 'Revise & Resubmit' based on state.",
              },
            ]}
          />
        </section>

        {/* Divider */}
        <div style={{ height: "1px", background: "#E6E3DD", marginBottom: "64px" }} />

        {/* ── Demo 2 — no annotations (caption only) ─────────── */}
        <section style={{ marginBottom: "64px" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "#CECAC2", marginBottom: "20px" }}>
            Without annotations — caption only
          </p>

          <AnnotatedImage
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
            alt="Analytics dashboard"
            caption="Project-level view showing all modules and their individual Short Flow states"
          />
        </section>

      </div>
    </main>
  );
}
