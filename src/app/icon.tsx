import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0710",
          borderRadius: 14,
          fontSize: 40,
          fontFamily: "Georgia, serif",
          color: "white",
        }}
      >
        M
        <span
          style={{
            background: "linear-gradient(100deg, #b46bd6 0%, #e35b96 55%, #e8965a 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          .
        </span>
      </div>
    ),
    { ...size }
  );
}
