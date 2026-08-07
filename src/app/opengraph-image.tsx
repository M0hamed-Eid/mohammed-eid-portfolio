import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 15% 20%, rgba(180,107,214,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(232,150,90,0.25), transparent 45%), #0a0710",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#a0a0b0",
            fontSize: 28,
            fontFamily: "Arial",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#34d399",
              display: "flex",
            }}
          />
          Open to AI/ML Engineer & Data Scientist roles
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Georgia, serif",
            color: "white",
            fontSize: 88,
            lineHeight: 1.05,
          }}
        >
          <span>Mohammed Eid</span>
          <span
            style={{
              fontStyle: "italic",
              background:
                "linear-gradient(100deg, #b46bd6 0%, #e35b96 55%, #e8965a 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Abdelmeguid
          </span>
        </div>
        <div
          style={{
            display: "flex",
            color: "#c4c4d0",
            fontSize: 32,
            fontFamily: "Arial",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {siteConfig.roles.join("  ·  ")}
        </div>
      </div>
    ),
    { ...size }
  );
}
