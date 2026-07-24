import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import DeleteSkillButton from "./DeleteSkillButton";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }],
  });

  const groupedSkills = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const category = skill.category || "Other";
    acc[category] = [...(acc[category] || []), skill];
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-indigo-600 to-violet-500 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-100">Skills</p>
        <h1 className="mt-2 text-2xl font-semibold">Manage skill highlights</h1>
      </div>

      <div className="flex justify-end">
        <Link href="/admin/skills/new" className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
          Add Skill
        </Link>
      </div>

      {Object.entries(groupedSkills).length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">No skills yet</p>
          <p className="mt-2 text-sm">Create your first skill to populate the dashboard and public portfolio.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, items]) => (
            <section key={category} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{category}</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{items.length} items</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((skill) => (
                  <div key={skill.id} className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600">
                            <span className="text-lg font-semibold">{skill.name.slice(0, 1)}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{skill.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{skill.category}</p>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Proficiency: {skill.proficiency}%</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">#{skill.order}</span>
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <Link href={`/admin/skills/${skill.id}/edit`} className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                        Edit
                      </Link>
                      <DeleteSkillButton skillId={skill.id} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
