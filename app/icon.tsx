import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "#18171A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", width: 2.6, height: 18, background: "#F9F8F5", borderRadius: 2 }} />
          <div style={{ position: "absolute", width: 2.6, height: 18, background: "#F9F8F5", borderRadius: 2, transform: "rotate(60deg)" }} />
          <div style={{ position: "absolute", width: 2.6, height: 18, background: "#F9F8F5", borderRadius: 2, transform: "rotate(-60deg)" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
