import { LegalPage, legalMetadata } from "@/components/legal-page";
import type { Locale } from "@/lib/content/projects";
export async function generateMetadata({ params }: { params: { locale: Locale } }) { return legalMetadata(params.locale, "license"); }
export default function LicensePage({ params }: { params: { locale: Locale } }) { return <LegalPage locale={params.locale} slug="license" />; }
