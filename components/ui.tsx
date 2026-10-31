import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span className="h-px w-5 bg-cobalt" aria-hidden="true" />{children}</p>;
}

export function PageIntro({
  eyebrow,
  title,
  children
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="grid gap-6 border-b border-rule pb-9 md:grid-cols-[1.1fr_0.9fr] md:items-end md:pb-12">
      <div><Eyebrow>{eyebrow}</Eyebrow><h1 className="mt-5 max-w-4xl font-display text-4xl font-medium leading-[1.02] tracking-editorial sm:text-6xl lg:text-7xl">{title}</h1></div>
      {children ? <div className="max-w-xl text-sm leading-7 text-muted md:justify-self-end md:text-base">{children}</div> : null}
    </header>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <Link href={href} className={`group inline-flex items-center gap-2 border-b border-cobalt pb-1 text-sm font-semibold no-underline transition-colors hover:text-cobalt ${className}`}>{children}<span aria-hidden="true">↗</span></Link>;
}

export function CropLabel({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-muted"><span className="inline-block h-2 w-2 border border-cobalt" aria-hidden="true" />{children}</span>;
}
