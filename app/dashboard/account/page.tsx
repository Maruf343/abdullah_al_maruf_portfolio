import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { withDbFallback } from "../../../lib/dbSafe";

export default async function ClientAccountPage() {
  const session = await auth();

  if (!session || session.user.role !== "client") {
    redirect("/login");
  }

  const client = await withDbFallback(
    () => prisma.client.findUnique({ where: { id: Number(session.user.id) } }),
    null
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-400">Account Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Manage your client profile</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Review the details associated with your client profile and keep your contact information current.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-6 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100">Profile overview</p>
        <p className="mt-2 text-xl font-semibold">{client?.name || session.user.name}</p>
        <p className="mt-1 text-sm text-emerald-50">{client?.email || session.user.email}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/50">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Name</p>
          <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{client?.name || session.user.name}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/50">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</p>
          <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{client?.email || session.user.email}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/50">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Company</p>
          <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{client?.company || "Not provided"}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/50">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Last login</p>
          <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{client?.lastLoginAt ? new Date(client.lastLoginAt).toLocaleString() : "No recent activity"}</p>
        </div>
      </div>
    </div>
  );
}
