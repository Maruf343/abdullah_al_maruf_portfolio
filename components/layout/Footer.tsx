"use client";

import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full border-t border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80"
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

        {/* LEFT */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Mohammad Abdullah Al Maruf
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Frontend & MERN Stack Developer
          </p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Building modern, fast, and user-focused web applications with clean design and scalable architecture.
          </p>
        </div>

        {/* RIGHT - Social Icons */}
        <div className="flex justify-center md:justify-end items-center gap-5">
          <a
            href="https://github.com/Maruf343"
            target="_blank"
            rel="noreferrer"
            className="group p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-500 transition"
          >
            <FaGithub className="text-slate-600 dark:text-slate-300 group-hover:text-white transition" size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/mohammad-abdullah-al-maruf-63a393200/"
            target="_blank"
            rel="noreferrer"
            className="group p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-500 transition"
          >
            <FaLinkedin className="text-slate-600 dark:text-slate-300 group-hover:text-white transition" size={18} />
          </a>

          <a
            href="https://www.facebook.com/Abdullah.Maruf3434"
            target="_blank"
            rel="noreferrer"
            className="group p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-500 transition"
          >
            <FaFacebook className="text-slate-600 dark:text-slate-300 group-hover:text-white transition" size={18} />
          </a>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-6xl mx-auto px-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} All rights reserved.</p>

        <div className="h-1 w-28 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      </div>
    </footer>
  );
}