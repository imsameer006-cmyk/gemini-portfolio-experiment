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
          background: "#18171A",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: 20, height: 20 }}>
          <div style={{ position: "absolute", width: 2.6, height: 18, background: "#F9F8F5", borderRadius: 2, top: 1, left: 8.7 }} />
          <div style={{ position: "absolute", width: 2.6, height: 18, background: "#F9F8F5", borderRadius: 2, top: 1, left: 8.7, transform: "rotate(60deg)" }} />
          <div style={{ position: "absolute", width: 2.6, height: 18, background: "#F9F8F5", borderRadius: 2, top: 1, left: 8.7, transform: "rotate(-60deg)" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
