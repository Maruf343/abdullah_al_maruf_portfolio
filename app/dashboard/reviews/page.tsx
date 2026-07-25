import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { withDbFallback } from "../../../lib/dbSafe";
import ClientReviewForm from "../../../components/dashboard/ClientReviewForm";

export default async function ClientReviewsPage() {
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
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-400">Client Reviews</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Share your feedback</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Submit a testimonial directly from your dashboard and keep it linked to your client account.
        </p>
      </div>

      <ClientReviewForm defaultName={client?.name || session.user.name || ""} defaultEmail={client?.email || session.user.email || ""} />
    </div>
  );
}
