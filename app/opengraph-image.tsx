import { ImageResponse } from "next/og";

export const alt =
  "Sameer Gautam portfolio share image with a black asterisk mark";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#18171A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 380,
            height: 380,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 44,
              height: 320,
              background: "#F9F8F5",
              borderRadius: 24,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 44,
              height: 320,
              background: "#F9F8F5",
              borderRadius: 24,
              transform: "rotate(60deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 44,
              height: 320,
              background: "#F9F8F5",
              borderRadius: 24,
              transform: "rotate(-60deg)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
