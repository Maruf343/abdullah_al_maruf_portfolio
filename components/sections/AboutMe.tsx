"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaCode, FaLightbulb, FaUsers } from "react-icons/fa";
import aboutMe from "../../public/images/about-me.png";

export default function AboutMe() {
  return (
    <section className="relative overflow-hidden min-h-screen px-6 md:px-24 py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950">
      
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[420px] w-[420px] bg-indigo-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-7xl mx-auto"
      >
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            About Me
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white">
            I build polished web experiences with clean code and strong UX.
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-start">

          {/* LEFT SIDE */}
          <div className="space-y-8 text-slate-700 dark:text-slate-300">

            <p className="text-lg leading-8">
              I’m <span className="font-semibold text-indigo-600">Maruf</span>, a full-stack developer focused on modern web applications, performance, and scalability.
            </p>

            <p className="text-lg leading-8">
              I enjoy turning ideas into beautiful digital products that feel effortless to use and easy to maintain.
            </p>

            {/* FEATURES */}
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { icon: <FaCode />, label: "Clean code" },
                { icon: <FaLightbulb />, label: "Design-driven" },
                { icon: <FaUsers />, label: "User-focused" },
                { icon: <FaCode />, label: "Performance first" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/80"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600">
                    {item.icon}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* TERMINAL CARD */}
            <div className="rounded-2xl bg-gray-900 text-gray-100 border border-white/10 overflow-hidden font-mono shadow-xl">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="ml-3 text-sm text-gray-400">aboutMe.ts</span>
              </div>
              <pre className="p-4 text-sm leading-relaxed">
{`const developer = {
  name: "Maruf",
  role: "Full-Stack Developer",
  stack: ["React", "Next.js", "Node", "MongoDB"],
  mindset: "Clean Code • Scalable UI • UX First"
};`}
              </pre>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* IMAGE CARD */}
            <div className="relative rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
              
              <div className="relative flex justify-center">
                <div className="rounded-3xl overflow-hidden w-72 h-72 shadow-2xl hover:scale-105 transition">
                  <Image
                    src={aboutMe}
                    alt="Maruf"
                    className="object-cover"
                    width={300}
                    height={300}
                    priority
                  />
                </div>
              </div>
            </div>

            {/* STACK */}
            <div className="rounded-3xl bg-slate-100 p-6 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                Core stack
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "React",
                  "Next.js",
                  "Tailwind",
                  "Node.js",
                  "MongoDB",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-600 border border-indigo-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* STATS */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { value: "2+", label: "Years" },
                { value: "15+", label: "Projects" },
                { value: "8+", label: "Apps" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  <p className="text-2xl font-semibold text-indigo-600">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}