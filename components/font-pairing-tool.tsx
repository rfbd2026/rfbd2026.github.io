"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/content/projects";

const directions = [
  { id: "quiet", en: "Quiet editorial", fa: "تحریریه آرام", latin: "Inter", persian: "Vazirmatn", enWeight: 500, faWeight: 400, noteEn: "Neutral, measured, and easy to scan.", noteFa: "خنثی، سنجیده و خوانا." },
  { id: "character", en: "Expressive headline", fa: "تیتر پرشخصیت", latin: "Sora", persian: "Vazirmatn", enWeight: 600, faWeight: 500, noteEn: "A rounder display voice with a steady Persian companion.", noteFa: "نمایشی‌تر با همراهی خوانای فارسی." },
  { id: "product", en: "Product system", fa: "سیستم محصول", latin: "Inter", persian: "Vazirmatn", enWeight: 650, faWeight: 550, noteEn: "Use weight and hierarchy rather than extra decoration.", noteFa: "با وزن و سلسله‌مراتب، نه تزئین اضافه." }
] as const;

export function FontPairingTool({ locale }: { locale: Locale }) {
  const t = useTranslations("tools");
  const [selected, setSelected] = useState<string>("quiet");
  const [latin, setLatin] = useState("Inter");
  const [persian, setPersian] = useState("Vazirmatn");
  const fa = locale === "fa";
  const active = directions.find((item) => item.id === selected) ?? directions[0];

  return (
    <div className="font-tool">
      <div className="font-tool__controls paper-panel">
        <label className="field-wrap"><span>{fa ? "فونت لاتین" : "Latin font"}</span><select className="field" value={latin} onChange={(event) => setLatin(event.target.value)}><option>Inter</option><option>Sora</option></select></label>
        <label className="field-wrap"><span>{fa ? "فونت فارسی" : "Persian font"}</span><select className="field" value={persian} onChange={(event) => setPersian(event.target.value)}><option>Vazirmatn</option><option value="IranSans" disabled>IranSans — {fa ? "نیازمند فایل فونت دارای مجوز" : "licensed font file required"}</option></select></label>
        <p className="text-xs leading-6 text-muted">{fa ? "Vazirmatn فعال است. IranSans پس از دریافت فایل فونت دارای مجوز اضافه می‌شود." : "Vazirmatn is active. IranSans will be added once a licensed font file is available."}</p>
      </div>
      <div className="font-tool__directions" role="group" aria-label={t("pairing")}>
        {directions.map((direction) => <button className={`font-direction ${selected === direction.id ? "is-selected" : ""}`} type="button" key={direction.id} onClick={() => { setSelected(direction.id); setLatin(direction.latin); setPersian(direction.persian); }} aria-pressed={selected === direction.id}><span>{fa ? direction.fa : direction.en}</span><small>{direction.latin} / {direction.persian}</small></button>)}
      </div>
      <div className="font-preview paper-panel" dir={fa ? "rtl" : "ltr"}>
        <p className="eyebrow">{fa ? active.fa : active.en}</p>
        <div className="font-preview__pair" style={{ fontFamily: `${latin}, Inter, sans-serif`, fontWeight: active.enWeight }} lang="en">{t("sampleTitle")}</div>
        <div className="font-preview__pair font-preview__pair--fa" style={{ fontFamily: `${persian}, Vazirmatn, sans-serif`, fontWeight: active.faWeight }} lang="fa">{t("samplePersian")}</div>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">{fa ? active.noteFa : active.noteEn}</p>
      </div>
    </div>
  );
}
