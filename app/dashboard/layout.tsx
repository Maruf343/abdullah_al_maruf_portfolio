"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/client/dashboard", label: "Overview", icon: "◉" },
  { href: "/client/dashboard/reviews", label: "My Reviews", icon: "✦" },
  { href: "/client/dashboard/account", label: "Account", icon: "⚙" },
  { href: "/client/dashboard/logout", label: "Log out", icon: "↗" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-16">
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-4 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="mb-4 rounded-[1.5rem] bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-4 text-white shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100">Client Area</p>
            <h2 className="mt-2 text-xl font-semibold">Private Dashboard</h2>
          </div>

          <nav className="space-y-2">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-4 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
