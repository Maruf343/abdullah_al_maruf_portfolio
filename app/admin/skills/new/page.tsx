"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createSkill, type SkillActionState } from "../actions";

const initialState: SkillActionState = { success: false };

export default function NewSkillPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(createSkill, initialState);

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
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-100">Skills</p>
        <h1 className="mt-2 text-2xl font-semibold">Add a new skill</h1>
      </div>

      <form action={formAction} className="space-y-5 rounded-[1.5rem] border border-slate-200 bg-white/90 p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Name</span>
            <input name="name" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Category</span>
            <select name="category" defaultValue="Frontend" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
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
            <input name="icon" placeholder="e.g. SiReact" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Proficiency</span>
            <input type="number" name="proficiency" min="1" max="100" defaultValue={85} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Order</span>
            <input type="number" name="order" defaultValue={0} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Create skill</button>
          <a href="/admin/skills" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</a>
        </div>
      </form>
    </div>
  );
}
