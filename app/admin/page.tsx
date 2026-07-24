import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const [projectCount, messageCount, unreadCount] = await Promise.all([
    prisma.project.count(),
    prisma.message.count(),
    prisma.message.count({ where: { read: false } }),
  ]);

  const cards = [
    { title: "Projects", value: projectCount, accent: "from-indigo-600 to-violet-500" },
    { title: "Messages", value: messageCount, accent: "from-slate-900 to-slate-700" },
    { title: "Unread", value: unreadCount, accent: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-white shadow-2xl shadow-slate-200/60 dark:border-slate-800">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-200">
          Admin Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          Welcome back, admin.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Manage your portfolio content and stay on top of incoming messages from one polished control center.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70">
            <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${card.accent}`} />
            <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">{card.title}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
