"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import UploadField from "../../../components/ui/UploadField";
import { saveHeroContent, type HeroContentActionState } from "./actions";

type HeroContent = {
  name: string;
  tagline: string;
  roles: string[];
  cvUrl: string;
  profileImageUrl: string;
};

const initialState: HeroContentActionState = { success: false };

export default function HeroContentForm({ content }: { content: HeroContent | null }) {
  const router = useRouter();
  const [state, formAction] = useActionState(saveHeroContent, initialState);
  const [cvUrl, setCvUrl] = useState(content?.cvUrl ?? "");
  const [profileImageUrl, setProfileImageUrl] = useState(content?.profileImageUrl ?? "");

  useEffect(() => {
    if (state?.success && state.message) {
      toast.success(state.message);
      router.refresh();
    }
    if (!state?.success && state?.error) {
      toast.error(state.error);
    }
  }, [router, state]);

  return (
    <form action={formAction} className="space-y-5 rounded-[1.5rem] border border-slate-200 bg-white/90 p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Name</span>
          <input name="name" defaultValue={content?.name ?? ""} required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>Roles</span>
          <input name="roles" defaultValue={content?.roles?.join(", ") ?? ""} placeholder="Frontend Developer, UI Engineer" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
          <span>Tagline</span>
          <textarea name="tagline" defaultValue={content?.tagline ?? ""} rows={3} required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
          <span>CV URL</span>
          <input name="cvUrl" value={cvUrl} onChange={(event) => setCvUrl(event.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <div className="md:col-span-2">
          <UploadField
            label="Upload CV"
            name="cv"
            accept=".pdf,application/pdf"
            placeholder="Upload a PDF to populate the CV URL automatically."
            onUploadComplete={(url) => setCvUrl(url)}
          />
        </div>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
          <span>Profile image URL</span>
          <input name="profileImageUrl" value={profileImageUrl} onChange={(event) => setProfileImageUrl(event.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <div className="md:col-span-2">
          <UploadField
            label="Upload profile image"
            name="profileImage"
            accept="image/*"
            placeholder="Upload an image to populate the profile image URL automatically."
            onUploadComplete={(url) => setProfileImageUrl(url)}
          />
        </div>
      </div>

      <button type="submit" className="rounded-2xl bg-fuchsia-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-700">Save hero content</button>
    </form>
  );
}
