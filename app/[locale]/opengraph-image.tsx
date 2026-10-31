import { ImageResponse } from "next/og";
import type { Locale } from "@/lib/content/projects";

export const runtime = "edge";
export const alt = "Aref Bahadori — Visual Identity and Packaging";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage({ params }: { params: { locale: Locale } }) {
  const fa = params.locale === "fa";
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#fdf9f5", color: "#0B0B0B", fontFamily: "sans-serif", direction: fa ? "rtl" : "ltr" }}>
      <div style={{ position: "absolute", inset: 54, border: "1px solid #d7d2c8", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 54 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 18, letterSpacing: fa ? 0 : 3, textTransform: fa ? "none" : "uppercase", color: "#0B0B0B" }}>
          <span>{fa ? "استودیو طراحی مستقل" : "Independent design practice"}</span><span>FORT WORTH · TX</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 850 }}>
          <div style={{ fontSize: 88, fontWeight: 600, lineHeight: 1 }}>{fa ? "عارف بهادری" : "Aref Bahadori"}</div>
          <div style={{ fontSize: 36, color: "#595750", lineHeight: 1.25 }}>{fa ? "هویت بصری · بسته‌بندی · روایت محصول" : "Visual identity · Packaging · Product stories"}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
          <div style={{ width: 62, height: 62, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #0B0B0B", color: "#0B0B0B", fontSize: 24, fontWeight: 700 }}>A/B</div>
          <div style={{ fontSize: 15, letterSpacing: 3, color: "#77746e" }}>IDENTITY / PACKAGING / EDITION 2026</div>
        </div>
      </div>
      <div style={{ position: "absolute", right: -42, top: -75, width: 220, height: 220, border: "1px solid #0B0B0B", transform: "rotate(45deg)" }} />
      <div style={{ position: "absolute", left: 100, bottom: 104, width: 14, height: 14, background: "#0B0B0B" }} />
    </div>,
    { ...size }
  );
}
