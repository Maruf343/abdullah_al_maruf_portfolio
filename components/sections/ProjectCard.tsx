"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export type ProjectCardItem = {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  order: number;
  techStack: string[];
  category?: string;
};

type ProjectCardProps = {
  project: ProjectCardItem;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const description = project.description?.trim() || "";
  const needsReadMore = description.length > 160;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: index * 0.08 }}
        className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950/80"
      >
        <div className="overflow-hidden bg-slate-100 dark:bg-slate-900">
          <Image
            src={project.imageUrl || "/images/portfoliScreenShort.PNG"}
            alt={project.title}
            width={1200}
            height={560}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white sm:text-2xl">
                {project.title}
              </h3>
              {project.category ? (
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-700 dark:text-indigo-200">
                  {project.category}
                </span>
              ) : null}
            </div>

            <p className="line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {description}
            </p>

            {needsReadMore ? (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-300"
              >
                Read more
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack?.slice(0, 4).map((tag) => (
              <span
                key={`${project.title}-${tag}`}
                className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
            >
              View Live <FaExternalLinkAlt className="h-4 w-4" />
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Source
            </a>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-900">
                <Image
                  src={project.imageUrl || "/images/portfoliScreenShort.PNG"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-4 top-4 rounded-full bg-slate-950/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur"
                >
                  Close
                </button>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{project.title}</h3>
                  {project.category ? (
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-200">
                      {project.category}
                    </span>
                  ) : null}
                </div>

                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tag) => (
                    <span
                      key={`${project.title}-${tag}-modal`}
                      className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/25 transition hover:bg-indigo-700"
                  >
                    Open Live Project
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    View Repository
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
