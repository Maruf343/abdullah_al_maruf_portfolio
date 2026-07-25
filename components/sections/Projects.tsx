"use client";

import Link from "next/link";
import ProjectCard, { type ProjectCardItem } from "./ProjectCard";

type ProjectsProps = {
  projects: ProjectCardItem[];
  showViewAllButton?: boolean;
  totalProjectsCount?: number;
};

export default function Projects({ projects, showViewAllButton = false, totalProjectsCount = 0 }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:bg-slate-950/80 sm:p-8 md:p-12"
    >
      <div className="mb-10 space-y-3 text-center sm:mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Featured work</p>
        <h2 className="text-4xl font-extrabold text-slate-950 dark:text-white sm:text-5xl">Projects</h2>
        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
          Selected case studies that highlight polished interfaces, modern interactions, and thoughtful frontend architecture.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">No projects yet</p>
          <p className="mt-2 text-sm">Create your first project in the admin dashboard to see it here.</p>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          <div className="grid gap-6 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={`${project.title}-${project.id ?? index}`} project={project} index={index} />
            ))}
          </div>

          {showViewAllButton && totalProjectsCount > 6 ? (
            <div className="flex justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/25 transition hover:from-indigo-700 hover:to-violet-600"
              >
                View All Projects
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}