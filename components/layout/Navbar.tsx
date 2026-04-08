"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "About", href: "/#about-me", id: "about-me" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", initial === "dark");
    setTheme(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.55 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    setTheme(next);
  };

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll Progress */}
      <div className="h-1 w-full bg-slate-200/40 dark:bg-slate-800/40">
        <div
          className="h-full bg-indigo-600 transition-all duration-150 dark:bg-indigo-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="backdrop-blur-xl bg-white/80 border-b border-slate-200/70 dark:bg-slate-950/80 dark:border-slate-800/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-semibold text-slate-950 transition hover:text-slate-900 dark:text-white dark:hover:text-slate-200"
          >
            Portfolio
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                className={`text-sm font-medium transition ${
                  active === section.id
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {section.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              {mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/Maruf343"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.583 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.805 1.304 3.49.997.108-.775.42-1.305.762-1.604-2.666-.303-5.467-1.333-5.467-5.93 0-1.31.47-2.382 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 013.003-.404c1.018.005 2.042.138 3.003.404 2.292-1.552 3.298-1.23 3.298-1.23.654 1.653.242 2.873.118 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.92.43.37.813 1.102.813 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.216.699.825.581C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200 dark:hover:bg-slate-900"
            onClick={toggleMobileMenu}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden absolute inset-x-0 top-full z-40 border-t border-slate-200/70 bg-slate-50/95 px-4 py-5 shadow-2xl dark:border-slate-800/70 dark:bg-slate-950/95 transition-transform animate-slide-down">
            <div className="flex flex-col gap-3">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={section.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-base font-medium transition ${
                    active === section.id
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {section.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                  setMobileOpen(false);
                }}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-left text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition"
              >
                {mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
              </button>

              {/* Connect */}
              <div className="mt-3 rounded-3xl border border-slate-200 bg-white/95 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-300">
                <p className="mb-3 font-semibold text-slate-900 dark:text-white">Connect</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/Maruf343"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}