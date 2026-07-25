"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProjectCard, { type ProjectCardItem } from "./ProjectCard";

type ProjectsDirectoryProps = {
  projects: ProjectCardItem[];
};

const CATEGORY_OPTIONS = ["All", "Web App", "Mobile", "API/Backend", "Open Source", "Other"] as const;

export default function ProjectsDirectory({ projects }: ProjectsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>("All");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const title = project.title?.toLowerCase() ?? "";
      const description = project.description?.toLowerCase() ?? "";
      const tags = (project.techStack ?? []).join(" ").toLowerCase();
      const categoryMatches = category === "All" || (project.category ?? "Other") === category;
      const searchMatches = !debouncedQuery || [title, description, tags].some((value) => value.includes(debouncedQuery));

      return categoryMatches && searchMatches;
    });
  }, [category, debouncedQuery, projects]);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 md:p-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Back to Home
          </Link>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">All Projects</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              Explore the complete portfolio of work, filtered by category and search to quickly find the right project.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="flex-1">
              <span className="sr-only">Search projects</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, description, or tech stack"
                className="w-full rounded-2xl border border-slate-300 bg-white/90 px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </label>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              {CATEGORY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategory(option)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    category === option
                      ? "bg-gradient-to-r from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-900/20"
                      : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-800"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
            <p>Showing {filteredProjects.length} of {projects.length} projects</p>
            {filteredProjects.length === 0 ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/20 transition hover:from-indigo-700 hover:to-violet-600"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950/60">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">No projects match your search</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Try a different keyword or reset the filters to browse the full collection.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={`${project.title}-${project.id ?? index}`} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
