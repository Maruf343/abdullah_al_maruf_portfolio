"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio built with Next.js and Tailwind CSS. Responsive and modern design with dark mode support.",
    image: "/images/portfoliScreenShort.PNG", // keep string for public folder
    liveLink: "https://yourportfolio.com",
  },
  {
    title: "Gardening Community Hub",
    description:
      "Full-stack gardening community project with user authentication, tips sharing, and dark/light mode.",
    image: "/images/garden.PNG",
    liveLink: "https://garden-community-ee176.web.app/",
  },
  {
    title: "Food Donation App",
    description:
      "MERN Stack project to manage food donations and requests with Firebase authentication.",
    image: "/images/food.PNG",
    liveLink: "https://food-sharing-e4eb1.web.app/",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-8 shadow-soft backdrop-blur-xl dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:border-slate-800 dark:bg-slate-950/80 md:p-12"
    >
      <div className="mb-12 space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
          Featured work
        </p>
        <h2 className="text-4xl font-extrabold text-slate-950 dark:text-white sm:text-5xl">
          Projects
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
          Selected case studies that highlight polished interfaces, modern interactions, and thoughtful frontend architecture.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: index * 0.15 }}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-soft transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950/80"
          >
            <div className="overflow-hidden bg-slate-100 dark:bg-slate-900">
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={560}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-5 p-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
              </div>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                View Live <FaExternalLinkAlt className="h-4 w-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}