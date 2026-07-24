import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { withDbFallback } from "../../../lib/dbSafe";
import DeleteProjectButton from "./DeleteProjectButton";

export default async function AdminProjectsPage() {
  const projects = await withDbFallback(
    () =>
      prisma.project.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      }),
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-white shadow-xl md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">Projects</p>
          <h1 className="mt-2 text-2xl font-semibold">Manage portfolio projects</h1>
        </div>
        <Link href="/admin/projects/new" className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
          Add project
        </Link>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white/90 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-950/60">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Order</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Featured</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {projects.map((project) => (
                <tr key={project.id} className="bg-white/80 dark:bg-slate-900/40">
                  <td className="px-4 py-4 text-sm text-slate-800 dark:text-slate-200">{project.title}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{project.order}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{project.featured ? "Yes" : "No"}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admin/projects/${project.id}/edit`} className="rounded-2xl border border-slate-300 px-3 py-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Edit</Link>
                      <DeleteProjectButton projectId={project.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
