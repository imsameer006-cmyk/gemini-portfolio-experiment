import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#18171A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", width: 14, height: 100, background: "#F9F8F5", borderRadius: 8 }} />
          <div style={{ position: "absolute", width: 14, height: 100, background: "#F9F8F5", borderRadius: 8, transform: "rotate(60deg)" }} />
          <div style={{ position: "absolute", width: 14, height: 100, background: "#F9F8F5", borderRadius: 8, transform: "rotate(-60deg)" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
