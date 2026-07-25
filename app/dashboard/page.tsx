import Link from "next/link";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { withDbFallback } from "../../lib/dbSafe";

export default async function ClientDashboardPage() {
  const session = await auth();

  if (!session || session.user.role !== "client") {
    redirect("/login");
  }

  const [projectCount, pageViewCount] = await Promise.all([
    withDbFallback(() => prisma.project.count(), 0),
    withDbFallback(() => prisma.pageView.count(), 0),
  ]);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-8 text-white shadow-2xl shadow-slate-200/60 dark:border-slate-800">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-100">Client Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold">Welcome back, {session.user.name || "client"}.</h1>
        <p className="mt-3 max-w-2xl text-sm text-emerald-50">
          Your private client area keeps account details, project visibility, and review submissions in one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Projects</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{projectCount}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Tracked page views</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{pageViewCount}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Signed in as</p>
          <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{session.user.email}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Quick access</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/60">
              <p className="font-semibold text-slate-950 dark:text-white">Share feedback</p>
              <p className="mt-1">Submit a testimonial directly from your dashboard and keep it linked to your client account.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/60">
              <p className="font-semibold text-slate-950 dark:text-white">Review account details</p>
              <p className="mt-1">Keep your profile information up to date so communication stays smooth.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-sm dark:border-slate-700">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Next steps</p>
          <div className="mt-4 space-y-3 text-sm text-slate-200">
            <Link href="/client/dashboard/reviews" className="block rounded-2xl border border-white/10 bg-white/10 px-4 py-3 transition hover:bg-white/20">
              Write a review
            </Link>
            <Link href="/client/dashboard/account" className="block rounded-2xl border border-white/10 bg-white/10 px-4 py-3 transition hover:bg-white/20">
              Update your profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
