import { redirect } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import { withDbFallback } from "../../../../../lib/dbSafe";
import EditProjectForm from "./EditProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = Number(id);
  const project = await withDbFallback(() => prisma.project.findUnique({ where: { id: projectId } }), null);

  if (!project) {
    redirect("/admin/projects");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">Projects</p>
        <h1 className="mt-2 text-2xl font-semibold">Edit project</h1>
      </div>

      <EditProjectForm project={project} />
    </div>
  );
}
