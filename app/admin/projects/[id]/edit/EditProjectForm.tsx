"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import UploadField from "../../../../../components/ui/UploadField";
import { updateProject, type ProjectActionState } from "../../actions";

type ProjectFormValues = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  order: number;
};

const initialState: ProjectActionState = { success: false };

export default function EditProjectForm({ project }: { project: ProjectFormValues }) {
  const router = useRouter();
  const [state, formAction] = useActionState(updateProject, initialState);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(project.imageUrl);

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
    <form action={formAction} className="space-y-5 rounded-[1.5rem] border border-slate-200 bg-white/90 p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <input type="hidden" name="id" value={project.id} />
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Title</span>
          <input name="title" defaultValue={project.title} required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Order</span>
          <input type="number" name="order" defaultValue={project.order} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
          <span>Description</span>
          <textarea name="description" defaultValue={project.description} required rows={4} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Live URL</span>
          <input name="liveUrl" defaultValue={project.liveUrl} required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Repository URL</span>
          <input name="repoUrl" defaultValue={project.repoUrl} required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
          <span>Tech Stack (comma separated)</span>
          <input name="techStack" defaultValue={project.techStack.join(", ")} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
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
            placeholder="Upload a new image to replace the current project image."
            onUploadComplete={(url) => setUploadedImageUrl(url)}
          />
        </div>
        <label className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
          <input type="checkbox" name="featured" defaultChecked={project.featured} className="h-4 w-4 rounded border-slate-300" />
          Featured project
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Save changes</button>
        <a href="/admin/projects" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</a>
      </div>
    </form>
  );
}
