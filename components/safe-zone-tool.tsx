"use client";

/* eslint-disable @next/next/no-img-element -- user-uploaded blob previews are ephemeral and never pass through the image optimizer. */
import { useEffect, useState, type ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/content/projects";

const formats = {
  square: { ratio: "1 / 1", en: "Square post", fa: "پست مربعی", top: 0.09, bottom: 0.18, side: 0.07 },
  portrait: { ratio: "4 / 5", en: "Portrait post", fa: "پست عمودی", top: 0.09, bottom: 0.18, side: 0.07 },
  story: { ratio: "9 / 16", en: "Story / Reel", fa: "استوری / ریلز", top: 0.16, bottom: 0.2, side: 0.08 }
} as const;

type Format = keyof typeof formats;

export function SafeZoneTool({ locale }: { locale: Locale }) {
  const t = useTranslations("tools");
  const [format, setFormat] = useState<Format>("square");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const fa = locale === "fa";

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function chooseImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setError("");
    if (!file) return;
    setPreview("");
    if (!file.type.startsWith("image/")) { setError(fa ? "فقط فایل تصویری انتخاب کنید." : "Choose an image file."); return; }
    if (file.size > 20 * 1024 * 1024) { setError(fa ? "حجم تصویر باید کمتر از ۲۰ مگابایت باشد." : "Keep the image under 20 MB."); return; }
    setPreview(URL.createObjectURL(file));
  }

  const guide = formats[format];
  return (
    <div className="safe-tool">
      <div className="safe-tool__controls paper-panel">
        <label className="upload-zone upload-zone--compact"><span className="upload-zone__mark" aria-hidden="true">＋</span><span className="font-semibold">{t("upload")}</span><span className="text-xs text-muted">{fa ? "حداکثر ۲۰ مگابایت؛ فقط در مرورگر شما" : "Up to 20 MB; processed in your browser"}</span><input type="file" accept="image/*" onChange={chooseImage} /></label>
        <fieldset className="mt-6"><legend className="text-xs font-bold uppercase tracking-wider">{fa ? "قالب انتشار" : "Post format"}</legend><div className="format-options mt-3">{(Object.keys(formats) as Format[]).map((key) => <button type="button" key={key} className={`format-button ${format === key ? "is-active" : ""}`} onClick={() => setFormat(key)} aria-pressed={format === key}>{fa ? formats[key].fa : formats[key].en}</button>)}</div></fieldset>
        <p className="mt-5 text-xs leading-6 text-muted">{t("privacy")}</p>
      </div>
      <div className="safe-preview__stage">
        {preview ? <div className="safe-preview" style={{ aspectRatio: guide.ratio }}>
          <img src={preview} alt={fa ? "پیش‌نمایش طرح بارگذاری‌شده" : "Uploaded artwork preview"} />
          <div className="safe-preview__mask safe-preview__mask--top" style={{ height: `${guide.top * 100}%` }}><span>{fa ? "کنترل‌های بالا" : "Top controls"}</span></div>
          <div className="safe-preview__mask safe-preview__mask--bottom" style={{ height: `${guide.bottom * 100}%` }}><span>{fa ? "کپشن / کنترل‌ها" : "Caption / controls"}</span></div>
          <div className="safe-preview__safe" style={{ inset: `${guide.top * 100}% ${guide.side * 100}% ${guide.bottom * 100}%` }}><span>{t("safeArea")}</span></div>
          {format === "story" ? <span className="safe-preview__profile" aria-hidden="true" /> : null}
        </div> : <div className="safe-preview__empty" style={{ aspectRatio: guide.ratio }}><span className="crop-mark crop-mark--tl" aria-hidden="true" /><span className="crop-mark crop-mark--br" aria-hidden="true" /><p>{fa ? "برای دیدن راهنما، تصویر خود را انتخاب کنید." : "Choose an image to see the safe-zone guide."}</p></div>}
        {error ? <p className="form-status form-status--error mt-3" role="alert">{error}</p> : null}
        <p className="mt-3 text-xs text-muted">{fa ? "راهنماها نمونه‌های عمومی هستند؛ چیدمان اینستاگرام با قالب و رابط کاربری تغییر می‌کند." : "Guides are general examples; Instagram layouts may shift across formats and interface updates."}</p>
      </div>
    </div>
  );
}
