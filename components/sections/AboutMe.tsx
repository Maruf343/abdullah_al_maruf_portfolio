"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaCode, FaLightbulb, FaUsers, FaFileAlt, FaGithub, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import aboutMe from "../../public/images/about-me.png";

export default function AboutMe() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <section className="relative overflow-hidden min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-20 md:py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950">

      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] bg-indigo-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            About Me
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white">
            Building polished web experiences with modern UI & strong UX.
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 sm:gap-12 md:gap-16 lg:grid-cols-[1.2fr_0.8fr] items-start">

          {/* LEFT CONTENT */}
          <div className="space-y-6 sm:space-y-8 text-slate-700 dark:text-slate-300">
            <p className="text-base sm:text-lg leading-7 sm:leading-9">
              I’m <span className="font-semibold text-indigo-600">Maruf</span>, a full-stack developer focusing on scalable, performant, and aesthetic web applications.
            </p>
            <p className="text-base sm:text-lg leading-7 sm:leading-9">
              I love converting ideas into seamless digital experiences that are easy to use, maintain, and delight users.
            </p>

            {/* Features */}
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
              {[
                { icon: <FaCode />, label: "Clean code" },
                { icon: <FaLightbulb />, label: "Design-driven" },
                { icon: <FaUsers />, label: "User-focused" },
                { icon: <FaCode />, label: "Performance first" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/80 transition-all"
                >
                  <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600">
                    {item.icon}
                  </div>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Terminal Card */}
            <div className="rounded-2xl bg-gray-900 text-gray-100 border border-white/10 overflow-hidden font-mono shadow-xl">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="ml-2 text-xs sm:text-sm text-gray-400">aboutMe.ts</span>
              </div>
              <pre className="p-3 sm:p-4 text-xs sm:text-sm leading-relaxed">
{`const developer = {
  name: "Maruf",
  role: "Full-Stack Developer",
  stack: ["React", "Next.js", "Node.js", "MongoDB"],
  mindset: "Clean Code • Scalable UI • UX First"
};`}
              </pre>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Image Card */}
            <div className="relative rounded-[2rem] border border-slate-200 bg-white/90 p-4 sm:p-6 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 hover:scale-105 transition-transform">
              <div className="relative flex justify-center">
                <div className="rounded-3xl overflow-hidden w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 shadow-2xl">
                  <Image
                    src={aboutMe}
                    alt="Maruf"
                    className="object-cover"
                    width={320}
                    height={320}
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Core Stack + CV */}
            <div className="rounded-3xl bg-slate-100 p-4 sm:p-6 dark:bg-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                  Core Stack
                </p>
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                  {["React", "Next.js", "Tailwind", "Node.js", "MongoDB"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm bg-indigo-500/10 text-indigo-600 border border-indigo-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setCvOpen(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-2xl shadow-lg hover:bg-indigo-500 transition"
              >
                <FaFileAlt /> View CV
              </button>
            </div>

            {/* Stats */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2">
              {[{ value: "1+", label: "Years" }, { value: "11+", label: "Projects" }].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-200 bg-white p-3 sm:p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  <p className="text-lg sm:text-2xl font-semibold text-indigo-600">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CV Modal */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setCvOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-5xl w-full relative overflow-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  My Resume
                </h3>
                <button
                  onClick={() => setCvOpen(false)}
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-xl sm:text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Embedded CV content */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed overflow-y-auto max-h-[75vh] pr-2">
                <p>
                  <strong>Enthusiastic Frontend Developer</strong> with a solid foundation in JavaScript, React, and MERN stack development. Experienced in building responsive, user-friendly web applications using React Router, Tailwind CSS, Firebase Authentication, and REST APIs through personal projects.
                </p>
                <p>Passionate about clean code, problem-solving, and continuous learning, aiming to contribute to innovative development teams and grow into a full-stack role.</p>

                <h4 className="font-semibold mt-4">Professional Experience</h4>
                <p><strong>Digi5 Ltd (3 Months) — Frontend Developer (MERN Stack)</strong></p>
                <ul className="list-disc list-inside">
                  <li>Developed responsive UIs using HTML, CSS, and JavaScript.</li>
                  <li>Fixed UI/UX issues and improved website usability.</li>
                  <li>Created a full-stack Food Sharing system: users can donate or request food, with secure dashboards and real-time updates.</li>
                  <li>Built Garden Community project: allowed members to share gardening tips, events, and community updates.</li>
                  <li>Implemented Tailwind CSS, React Router, Axios for seamless UX.</li>
                </ul>

                <h4 className="font-semibold mt-4">Skills & Tools</h4>
                <p>Frontend: React, Next.js, JavaScript</p>
                <p>Backend & Database: Node.js, Express.js, MongoDB</p>
                <p>Styling/UI: Tailwind CSS, Responsive Design, UI/UX Principles</p>
                <p>Authentication & Hosting: Firebase Authentication</p>

                <h4 className="font-semibold mt-4">Education</h4>
                <p><strong>Govt. Titumir College — BA Honors Islamic History & Culture</strong> (2025 – Present)</p>
                <p><strong>Programming Hero — MERN Stack Web Development</strong> (Graduated Aug 2025)</p>
                <p><strong>PencilBox Training Institute — Web Design & Development</strong> (March 2024)</p>

                <h4 className="font-semibold mt-4">Contact & Links</h4>
                <p className="flex items-center gap-2"><FaPhoneAlt /> 01571350711</p>
                <p className="flex items-center gap-2"><FaEnvelope /> abdullah.almaruf1121@gmail.com</p>
                <p className="flex items-center gap-2"><FaGithub /> <a href="https://github.com/Maruf343" target="_blank" className="text-indigo-600 hover:underline">https://github.com/Maruf343</a></p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}