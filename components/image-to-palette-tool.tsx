"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, type ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { createAse } from "@/lib/ase";
import { extractDominantColors, rgbToHex, rgbToHsl, type RGB } from "@/lib/color";
import type { Locale } from "@/lib/content/projects";

function rgbLabel(color: RGB) { return `rgb(${color.r}, ${color.g}, ${color.b})`; }
function hslLabel(color: RGB) { const hsl = rgbToHsl(color); return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`; }

export function ImageToPaletteTool({ locale }: { locale: Locale }) {
  const t = useTranslations("tools");
  const [colors, setColors] = useState<RGB[]>([]);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const fa = locale === "fa";

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  async function processFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setColors([]);
    setError("");
    if (!file) return;
    setPreview("");
    if (!file.type.startsWith("image/")) { setError(fa ? "فقط فایل تصویری انتخاب کنید." : "Choose an image file."); return; }
    if (file.size > 15 * 1024 * 1024) { setError(fa ? "حجم تصویر باید کمتر از ۱۵ مگابایت باشد." : "Keep the image under 15 MB."); return; }
    setBusy(true);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 96 / Math.max(bitmap.width, bitmap.height));
      const width = Math.max(1, Math.round(bitmap.width * scale));
      const height = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("Canvas is not available.");
      context.drawImage(bitmap, 0, 0, width, height);
      bitmap.close();
      setColors(extractDominantColors(context.getImageData(0, 0, width, height).data, 5));
    } catch {
      setError(fa ? "پردازش این تصویر ممکن نشد؛ فایل دیگری را امتحان کنید." : "This image could not be processed. Try another file.");
    } finally {
      setBusy(false);
    }
  }

  async function copy(value: string) {
    try { await navigator.clipboard.writeText(value); setError(""); }
    catch { setError(fa ? "دسترسی به کلیپ‌بورد ممکن نیست." : "Clipboard access is unavailable."); }
  }

  function saveAse() {
    if (!colors.length) return;
    const url = URL.createObjectURL(createAse(colors));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "aref-image-palette.ase";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const css = colors.map((color, index) => `  --palette-${String(index + 1).padStart(2, "0")}: ${rgbToHex(color)};`).join("\n");

  return (
    <div className="palette-tool">
      <div className="palette-tool__upload paper-panel">
        <label className="upload-zone">
          <span className="upload-zone__mark" aria-hidden="true">＋</span>
          <span className="font-semibold">{t("upload")}</span>
          <span className="text-xs leading-6 text-muted">{fa ? "PNG، JPEG یا WebP · حداکثر ۱۵ مگابایت" : "PNG, JPEG, or WebP · up to 15 MB"}</span>
          <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={processFile} />
        </label>
        {preview ? <div className="palette-tool__source"><img src={preview} alt={fa ? "تصویر انتخاب‌شده برای استخراج رنگ" : "Selected image for color extraction"} /><p>{t("privacy")}</p></div> : <p className="mt-5 text-xs leading-6 text-muted">{t("privacy")}</p>}
      </div>
      <div className="palette-tool__results">
        {busy ? <div className="paper-panel p-7" role="status">{t("loading")}</div> : null}
        {error ? <p className="form-status form-status--error" role="alert">{error}</p> : null}
        {colors.length ? <>
          <div className="palette-swatches" aria-label={t("palette")}>
            {colors.map((color, index) => <article className="palette-swatch" key={`${rgbToHex(color)}-${index}`}>
              <button className="palette-swatch__color" type="button" style={{ backgroundColor: rgbToHex(color) }} onClick={() => copy(rgbToHex(color))} aria-label={`${t("copy")} ${rgbToHex(color)}`} />
              <div className="palette-swatch__values"><strong>{rgbToHex(color)}</strong><span>{rgbLabel(color)}</span><span>{hslLabel(color)}</span><button type="button" className="text-link" onClick={() => copy(rgbToHex(color))}>{t("copy")}</button></div>
            </article>)}
          </div>
          <div className="palette-tool__actions"><button className="button button--outline" type="button" onClick={() => copy(`:root {\n${css}\n}`)}>{t("copyCss")}</button><button className="button button--ink" type="button" onClick={saveAse}>{t("downloadAse")}</button></div>
          <pre className="css-export" dir="ltr"><code>{`:root {\n${css}\n}`}</code></pre>
        </> : <div className="paper-panel palette-empty"><span className="palette-empty__bars" aria-hidden="true"><i /><i /><i /><i /><i /></span><p>{fa ? "تصویری انتخاب کنید تا پنج رنگ غالب استخراج شود." : "Choose an image to extract five dominant colors."}</p></div>}
      </div>
    </div>
  );
}
