"use client";

import { useState } from "react";
import {
  FaCode,
  FaLightbulb,
  FaUsers,
  FaFileAlt,
  FaTimes,
  FaStar,
  FaBolt,
  FaDownload,
  FaExternalLinkAlt,
  FaBriefcase,
  FaGraduationCap,
  FaAward,
} from "react-icons/fa";

// Online workspace image
const workspaceImg = "/images/developer-workspace.jpg";

const features: { iconName: "code" | "lightbulb" | "users" | "bolt"; label: string; desc: string }[] = [
  { iconName: "code", label: "Clean Code", desc: "Readable & maintainable architecture" },
  { iconName: "lightbulb", label: "Design Driven", desc: "Pixel-perfect modern UI" },
  { iconName: "users", label: "User Focused", desc: "Intuitive digital experiences" },
  { iconName: "bolt", label: "Performance", desc: "Blazing fast applications" },
];

const getFeatureIcon = (iconName: "code" | "lightbulb" | "users" | "bolt") => {
  const icons = {
    code: <FaCode className="h-5 w-5" />,
    lightbulb: <FaLightbulb className="h-5 w-5" />,
    users: <FaUsers className="h-5 w-5" />,
    bolt: <FaBolt className="h-5 w-5" />,
  };
  return icons[iconName];
};

const highlights: { iconName: "briefcase" | "graduationcap" | "award"; text: string }[] = [
  { iconName: "briefcase", text: "Full-Stack Web Development" },
  { iconName: "graduationcap", text: "Continuous Learner & Problem Solver" },
  { iconName: "award", text: "Passionate About Clean UI/UX" },
];

const getHighlightIcon = (iconName: "briefcase" | "graduationcap" | "award") => {
  const icons = {
    briefcase: <FaBriefcase className="h-4 w-4" />,
    graduationcap: <FaGraduationCap className="h-4 w-4" />,
    award: <FaAward className="h-4 w-4" />,
  };
  return icons[iconName];
};

const techStack = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"];

const stats = [
  { value: "1+", label: "Years Experience" },
  { value: "11+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
];

const CV_PDF_URL = "/images/Mohammad_abdullah_al_maruf (1).pdf";

export default function AboutMe() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-10 py-20 md:py-28 section-gradient min-h-screen flex items-center">

      {/* Glow blobs */}
      <div className="absolute top-10 left-1/3 h-[320px] w-[320px] sm:h-[500px] sm:w-[500px] bg-indigo-500/10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-1/4 h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] bg-indigo-500/5 blur-3xl rounded-full animate-pulse" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-600/20 mb-6">
            <FaStar className="h-3.5 w-3.5 text-indigo-600" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Crafting digital <br />
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              experiences
            </span>{" "}
            that matter.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            Turning complex problems into elegant, scalable solutions with modern technologies and a keen eye for design.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 md:gap-12 lg:gap-16 md:grid-cols-1 lg:grid-cols-2 items-start">

          {/* LEFT */}
          <div className="space-y-8">
            {/* Bio */}
            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <p>
                Hi, I'm <span className="font-semibold text-indigo-600">Maruf</span> — a passionate full-stack developer dedicated to building scalable, performant, and beautifully designed web applications.
              </p>
              <p>
                I specialize in transforming ideas into production-ready digital products with a strong emphasis on clean code, intuitive user interfaces, and exceptional user experiences.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3 max-w-md mx-auto lg:mx-0">
              {highlights.map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600">
                    {getHighlightIcon(item.iconName)}
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
              {features.map((item) => (
                <div key={item.label} className="glass-card-hover rounded-2xl p-4 text-center">
                  <div className="h-10 w-10 mx-auto flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 mb-2">
                    {getFeatureIcon(item.iconName)}
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Terminal card */}
            <div className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="ml-2 text-gray-400 text-xs font-mono">aboutMe.ts</span>
              </div>
              <pre className="p-4 bg-gray-900 text-gray-100 text-sm font-mono leading-relaxed">
{`const developer = {
  name: "Maruf",
  role: "Full-Stack Developer",
  stack: ["React", "Next.js", "Node.js"],
  mindset: "Clean • Scalable • UX First"
};`}
              </pre>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6 flex flex-col items-center">
            {/* Workspace image */}
            <div className="hidden md:block w-full max-w-sm rounded-3xl glass-card p-5">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-4 ring-indigo-500/10">
                <img
                  src={workspaceImg}
                  alt="Modern developer workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Tech stack + CV */}
            <div className="w-full max-w-md rounded-2xl glass-card p-5 space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 text-center">Core Stack</p>
              <div className="flex flex-wrap justify-center gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-600 border border-indigo-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setCvOpen(true)}
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <FaFileAlt className="h-4 w-4" /> View CV
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl glass-card p-5 text-center">
                  <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Philosophy quote */}
            <div className="w-full max-w-md rounded-2xl glass-card p-5 text-center">
              <p className="text-sm italic text-slate-500 leading-relaxed">
                "Great software is not just about code — it's about understanding users, solving real problems, and delivering experiences that feel effortless."
              </p>
              <p className="text-xs font-semibold text-indigo-600 mt-3">— Maruf</p>
            </div>
          </div>
        </div>
      </div>

      {/* CV Modal */}
      {cvOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
          onClick={() => setCvOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 relative flex flex-col"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                  <FaFileAlt className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">My Resume</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Maruf</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={CV_PDF_URL}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 transition-colors"
                >
                  <FaDownload className="h-3.5 w-3.5" /> Download
                </a>
                <a
                  href={CV_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 transition-colors"
                >
                  <FaExternalLinkAlt className="h-3.5 w-3.5" /> Open
                </a>
                <button
                  onClick={() => setCvOpen(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden rounded-b-3xl">
              <iframe
                src={CV_PDF_URL}
                className="w-full h-full border-0"
                style={{ minHeight: "60vh" }}
                title="Resume - Maruf"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}