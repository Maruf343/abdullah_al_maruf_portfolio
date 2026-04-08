import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "ghost";
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "href"> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "type">;

export default function Button({ variant = "primary", href, className = "", children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500";
  const styles = variant === "ghost"
    ? "bg-white/80 text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-800"
    : "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200";

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles} ${className}`} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
