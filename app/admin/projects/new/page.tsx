"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import UploadField from "../../../../components/ui/UploadField";
import { createProject, type ProjectActionState } from "../actions";

const initialState: ProjectActionState = { success: false };

export default function NewProjectPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(createProject, initialState);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  useEffect(() => {
    if (state?.success && state.message) {
      toast.success(state.message);
      router.push("/admin/projects");
    }
    if (!state?.success && state?.error) {
      toast.error(state.error);
    }
  }, [router, state]);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">Projects</p>
        <h1 className="mt-2 text-2xl font-semibold">Create a new project</h1>
      </div>

      <form action={formAction} className="space-y-5 rounded-[1.5rem] border border-slate-200 bg-white/90 p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Title</span>
            <input name="title" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Order</span>
            <input type="number" name="order" defaultValue={0} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Category</span>
            <select name="category" defaultValue="Other" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              <option value="Web App">Web App</option>
              <option value="Mobile">Mobile</option>
              <option value="API/Backend">API/Backend</option>
              <option value="Open Source">Open Source</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
            <span>Description</span>
            <textarea name="description" required rows={4} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Live URL</span>
            <input name="liveUrl" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Repository URL</span>
            <input name="repoUrl" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
            <span>Tech Stack (comma separated)</span>
            <input name="techStack" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
            <span>Image URL</span>
            <input name="imageUrl" value={uploadedImageUrl} onChange={(event) => setUploadedImageUrl(event.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <div className="md:col-span-2">
            <UploadField
              label="Upload project image"
              name="image"
              accept="image/*"
              placeholder="Upload an image to populate the image URL field automatically."
              onUploadComplete={(url) => setUploadedImageUrl(url)}
            />
          </div>
          <label className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            <input type="checkbox" name="featured" className="h-4 w-4 rounded border-slate-300" />
            Featured project
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Create project</button>
          <a href="/admin/projects" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</a>
        </div>
      </form>
    </div>
  );
}
