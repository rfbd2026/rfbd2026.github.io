import Image from "next/image";
import QRCode from "qrcode";
import type { Locale } from "@/lib/content/projects";
import { tronBase58ToHex } from "@/lib/payments/tron-nile";

export async function CryptoTestnetDemo({ locale }: { locale: Locale }) {
  const fa = locale === "fa";
  const receiver = process.env.TRON_NILE_RECEIVER_ADDRESS?.trim() || "";
  let validReceiver = "";
  if (process.env.TRON_NETWORK === "nile" && process.env.ENABLE_NILE_TESTNET_DEMO === "true" && receiver) {
    try { tronBase58ToHex(receiver); validReceiver = receiver; }
    catch { validReceiver = ""; }
  }
  const qr = validReceiver
    ? await QRCode.toDataURL(validReceiver, { errorCorrectionLevel: "M", margin: 1, width: 192 })
    : "";

  return (
    <section className="crypto-demo paper-panel" aria-labelledby="crypto-demo-title">
      <div className="crypto-demo__header">
        <div>
          <p className="eyebrow">{fa ? "دموی شبکه آزمایشی · بدون ارزش مالی" : "Testnet demo · no monetary value"}</p>
          <h2 id="crypto-demo-title" className="mt-3 font-display text-2xl">{fa ? "USDT TRC20 · شبکه Nile" : "USDT TRC20 · Nile testnet"}</h2>
        </div>
        <span className="product-status-label">{fa ? "فقط تست" : "TEST ONLY"}</span>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
        {fa
          ? "این بخش فقط برای نمایش جریان تأیید در شبکه آزمایشی TRON است. توکن آزمایشی، تتر واقعی نیست و ارزش مالی ندارد. تا زمان ارائه فایل‌های نهایی، پرداخت و ثبت شناسه تراکنش غیرفعال می‌ماند. هرگز دارایی واقعی ارسال نکنید."
          : "This panel only demonstrates a future TRON testnet verification flow. Test tokens are not real Tether and have no monetary value. Payment and TXID submission remain disabled until final native product files are supplied. Never send real assets."}
      </p>
      <div className="crypto-demo__body mt-6">
        <div className="crypto-demo__qr">
          {qr
            ? <Image src={qr} alt={fa ? "کد QR نشانی دریافت‌کننده آزمایشی Nile" : "QR code for the Nile test receiver"} width={192} height={192} unoptimized />
            : <div className="crypto-demo__qr-placeholder" aria-label={fa ? "کد QR تا پیکربندی نشانی دریافت‌کننده ساخته نمی‌شود" : "QR unavailable until a receiver address is configured"}><span aria-hidden="true">□</span><small>{fa ? "نشانی تست‌نت تنظیم نشده" : "Test receiver not configured"}</small></div>}
        </div>
        <div className="crypto-demo__steps">
          <p className="eyebrow">{fa ? "جریان آینده" : "Planned flow"}</p>
          <ol className="mt-3 list-decimal space-y-2 ps-5 text-sm leading-7">
            <li>{fa ? "فقط توکنِ بدون ارزشِ Nile؛ نه شبکه اصلی و نه تتر واقعی." : "Nile no-value test tokens only; never mainnet or real Tether."}</li>
            <li>{fa ? "نشانی عمومی و QR فقط پس از پیکربندی امنِ دریافت‌کننده نمایش داده می‌شود." : "The public receiver address and QR appear only after a verified test receiver is configured."}</li>
            <li>{fa ? "شناسه تراکنش پس از آماده‌شدن فایل‌های نهایی و فعال‌شدن تست دریافت می‌شود." : "A TXID can be submitted only after final files and the test flow are authorized."}</li>
          </ol>
          {validReceiver ? <p className="crypto-demo__address mt-4" dir="ltr">{validReceiver}</p> : <p className="mt-4 text-xs leading-6 text-muted">{fa ? "در حال حاضر هیچ نشانی یا QR ساختگی نمایش داده نمی‌شود." : "No wallet address or fabricated QR is shown at this time."}</p>}
          <label className="mt-4 block text-xs font-semibold">{fa ? "شناسه تراکنش (در حال حاضر غیرفعال)" : "Transaction ID (currently disabled)"}
            <input className="mt-2 w-full rounded-sm border border-rule bg-paper p-3 font-mono text-xs" type="text" inputMode="text" autoComplete="off" disabled placeholder={fa ? "پس از مجوزدهی فعال می‌شود" : "Available after authorization"} />
          </label>
          <button className="button button--disabled mt-4" type="button" disabled aria-disabled="true">{fa ? "تأیید آزمایشی غیرفعال است" : "Test verification disabled"}</button>
        </div>
      </div>
    </section>
  );
}
