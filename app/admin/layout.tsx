"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: "◉" },
  { href: "/admin/projects", label: "Projects", icon: "▣" },
  { href: "/admin/skills", label: "Skills", icon: "⚡" },
  { href: "/admin/hero", label: "Hero", icon: "✦" },
  { href: "/admin/about", label: "About", icon: "◌" },
  { href: "/admin/messages", label: "Messages", icon: "✉" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname === "/admin/login" || pathname === "/admin/logout";

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[80vh] rounded-[2rem] border border-slate-200/80 bg-slate-50/80 p-4 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 md:p-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full rounded-[1.5rem] border border-slate-200 bg-white/90 p-4 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70 lg:w-72">
          <div className="mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 p-4 text-white shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">Admin Panel</p>
            <h2 className="mt-2 text-xl font-semibold">Portfolio Control Center</h2>
          </div>

          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex-1 rounded-[1.5rem] border border-slate-200 bg-white/90 p-4 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
