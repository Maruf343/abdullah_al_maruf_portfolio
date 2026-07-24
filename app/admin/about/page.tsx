import { prisma } from "../../../lib/prisma";
import AboutContentForm from "./AboutContentForm";

export default async function AdminAboutPage() {
  const content = await prisma.aboutContent.findFirst();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-600 to-cyan-500 p-6 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-100">About</p>
        <h1 className="mt-2 text-2xl font-semibold">Edit about content</h1>
      </div>
      <AboutContentForm content={content} />
    </div>
  );
}
