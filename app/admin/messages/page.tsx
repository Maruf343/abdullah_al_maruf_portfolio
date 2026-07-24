import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { withDbFallback } from "../../../lib/dbSafe";
import { markMessageAsRead, sendReply } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const messages = await withDbFallback(
    () =>
      prisma.message.findMany({
        orderBy: [{ read: "asc" }, { createdAt: "desc" }],
      }),
    []
  );

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-amber-500 to-orange-500 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-100">Messages</p>
        <h1 className="mt-2 text-2xl font-semibold">Review inbound messages</h1>
        <p className="mt-3 max-w-2xl text-sm text-amber-50/90">
          Keep track of contact submissions, mark them as read, and reply directly from the inbox.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">No messages yet</p>
          <p className="mt-2 text-sm">Incoming contact requests will appear here automatically.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`rounded-[1.5rem] border p-6 shadow-lg ${message.read ? "border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70" : "border-amber-300 bg-amber-50/80 dark:border-amber-600/40 dark:bg-amber-950/20"}`}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{message.name}</h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${message.read ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300" : "bg-amber-500 text-white"}`}>
                      {message.read ? "Read" : "Unread"}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${message.replied ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>
                      {message.replied ? "Replied" : "Pending reply"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{message.email}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-800 dark:text-slate-200">{message.message}</p>
                </div>

                <form action={markMessageAsRead}>
                  <input type="hidden" name="id" value={message.id} />
                  <button type="submit" className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                    {message.read ? "Already read" : "Mark as read"}
                  </button>
                </form>
              </div>

              <form action={sendReply} className="mt-6 space-y-3 rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <input type="hidden" name="id" value={message.id} />
                <input type="hidden" name="originalName" value={message.name} />
                <input type="hidden" name="originalEmail" value={message.email} />
                <input type="hidden" name="originalMessage" value={message.message} />
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200" htmlFor={`reply-${message.id}`}>
                  Reply to {message.name}
                </label>
                <textarea
                  id={`reply-${message.id}`}
                  name="reply"
                  rows={4}
                  defaultValue=""
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="Write your response here..."
                />
                <button type="submit" className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                  Send reply
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
