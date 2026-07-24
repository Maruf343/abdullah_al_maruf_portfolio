"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { updateSkill, type SkillActionState } from "../../actions";

type SkillFormValues = {
  id: number;
  name: string;
  category: string;
  icon: string;
  proficiency: number;
  order: number;
};

const initialState: SkillActionState = { success: false };

export default function EditSkillForm({ skill }: { skill: SkillFormValues }) {
  const router = useRouter();
  const [state, formAction] = useActionState(updateSkill, initialState);

  useEffect(() => {
    if (state?.success && state.message) {
      toast.success(state.message);
      router.push("/admin/skills");
    }
    if (!state?.success && state?.error) {
      toast.error(state.error);
    }
  }, [router, state]);

  return (
    <form action={formAction} className="space-y-5 rounded-[1.5rem] border border-slate-200 bg-white/90 p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <input type="hidden" name="id" value={skill.id} />
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Name</span>
          <input name="name" defaultValue={skill.name} required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Category</span>
          <select name="category" defaultValue={skill.category} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
            <option value="Tools">Tools</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Custom Category</span>
          <input name="customCategory" placeholder="Optional custom category" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Icon Identifier</span>
          <input name="icon" defaultValue={skill.icon} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Proficiency</span>
          <input type="number" name="proficiency" min="1" max="100" defaultValue={skill.proficiency} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Order</span>
          <input type="number" name="order" defaultValue={skill.order} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Save changes</button>
        <a href="/admin/skills" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</a>
      </div>
    </form>
  );
}
