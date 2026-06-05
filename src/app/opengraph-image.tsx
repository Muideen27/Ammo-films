import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ammofilms — Nigerian talent to global streaming opportunities";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)",
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#D4AF37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0F172A",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <span style={{ fontSize: 48, fontWeight: 700 }}>Ammofilms</span>
        </div>
        <p style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, maxWidth: 900 }}>
          Connecting Nigerian Talent To Global Streaming Opportunities
        </p>
        <p style={{ fontSize: 22, color: "#94A3B8", marginTop: 24, maxWidth: 800 }}>
          Professional onboarding · Training · Trusted international platforms
        </p>
      </div>
    ),
    { ...size }
  );
}
