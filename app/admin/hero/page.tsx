import { prisma } from "../../../lib/prisma";
import { withDbFallback } from "../../../lib/dbSafe";
import HeroContentForm from "./HeroContentForm";

export default async function AdminHeroPage() {
  const content = await withDbFallback(() => prisma.heroContent.findFirst(), null);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-fuchsia-600 to-rose-500 p-6 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-100">Hero</p>
        <h1 className="mt-2 text-2xl font-semibold">Edit hero content</h1>
      </div>
      <HeroContentForm content={content} />
    </div>
  );
}
