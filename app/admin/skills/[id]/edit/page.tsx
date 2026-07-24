import { redirect } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import { withDbFallback } from "../../../../../lib/dbSafe";
import EditSkillForm from "./EditSkillForm";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skillId = Number(id);
  const skill = await withDbFallback(() => prisma.skill.findUnique({ where: { id: skillId } }), null);

  if (!skill) {
    redirect("/admin/skills");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-100">Skills</p>
        <h1 className="mt-2 text-2xl font-semibold">Edit skill</h1>
      </div>

      <EditSkillForm skill={skill} />
    </div>
  );
}
