import Projects from "../../../components/sections/Projects";

export default function ProjectsPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 md:p-12">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Projects</h1>
        <p className="mt-4 max-w-2xl leading-8 text-slate-600 dark:text-slate-300">
          Selected work demonstrating polished interfaces, modern interactions, and reliable development patterns.
        </p>
      </div>
      <Projects />
    </div>
  );
}
