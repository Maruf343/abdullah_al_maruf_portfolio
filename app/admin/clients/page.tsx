import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { withDbFallback } from "../../../lib/dbSafe";

export default async function AdminClientsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/client/dashboard");
  }

  const [clients, testimonials, pageViews, newClients, pendingReviews] = await Promise.all([
    withDbFallback(() => prisma.client.findMany({ orderBy: [{ createdAt: "desc" }] }), []),
    withDbFallback(() => prisma.testimonial.findMany({ orderBy: [{ createdAt: "desc" }] }), []),
    withDbFallback(() => prisma.pageView.count(), 0),
    withDbFallback(() => prisma.client.count({ where: { createdAt: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) } } }), 0),
    withDbFallback(() => prisma.testimonial.count({ where: { status: "pending" } }), 0),
  ]);

  const approvedCount = testimonials.filter((item) => item.status === "approved" || item.status === "pending").length;
  const rejectedCount = testimonials.filter((item) => item.status === "rejected").length;

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-white shadow-2xl shadow-slate-200/60 dark:border-slate-800">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-200">Clients & Visitors</p>
        <h1 className="mt-3 text-3xl font-semibold">Visibility dashboard</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Track registered clients, review status, and simple page-view activity from one central admin place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total clients</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{clients.length}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">New in 30 days</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{newClients}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Page views</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{pageViews}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending reviews</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{pendingReviews}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Registered clients</h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">{clients.length} total</span>
          </div>

          <div className="space-y-3">
            {clients.map((client) => (
              <div key={client.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-950 dark:text-white">{client.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{client.email}</p>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Joined {new Date(client.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Review status</h2>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
              <p className="text-sm text-slate-500 dark:text-slate-400">Approved</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{approvedCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
              <p className="text-sm text-slate-500 dark:text-slate-400">Rejected</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{rejectedCount}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
