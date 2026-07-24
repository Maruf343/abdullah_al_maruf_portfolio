"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import UploadField from "../../../components/ui/UploadField";
import { saveAboutContent, type AboutContentActionState } from "./actions";

type AboutContent = {
  bio: string;
  profileImageUrl: string;
};

const initialState: AboutContentActionState = { success: false };

export default function AboutContentForm({ content }: { content: AboutContent | null }) {
  const router = useRouter();
  const [state, formAction] = useActionState(saveAboutContent, initialState);
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
      <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        <span>Bio</span>
        <textarea name="bio" defaultValue={content?.bio ?? ""} rows={8} required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
      </label>

      <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        <span>Profile image URL</span>
        <input name="profileImageUrl" value={profileImageUrl} onChange={(event) => setProfileImageUrl(event.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
      </label>

      <UploadField
        label="Upload profile image"
        name="profileImage"
        accept="image/*"
        placeholder="Upload an image to populate the profile image URL automatically."
        onUploadComplete={(url) => setProfileImageUrl(url)}
      />

      <button type="submit" className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">Save about content</button>
    </form>
  );
}
