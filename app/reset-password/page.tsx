"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { resetClientPassword, type ClientAuthActionState } from "../../lib/clientAuth";

const initialState: ClientAuthActionState = {
  success: false,
  message: "",
  error: "",
};

function ResetPasswordContent({ token }: { token: string }) {
  const [state, formAction] = useActionState(resetClientPassword, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }

    if (state.success && state.message) {
      toast.success(state.message);
    }
  }, [state.error, state.success, state.message]);

  if (!token) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/90 p-8 text-center shadow-2xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-none">
          <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">Invalid reset link</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">This reset link is missing a valid token.</p>
          <Link href="/forgot-password" className="mt-5 inline-flex rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
            Request another reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-none">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Set a new password</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Choose your new password</h1>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
          Pick a strong password with at least 8 characters and a mix of letters and numbers.
        </div>

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="token" value={token} />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
              New password
            </label>
            <input id="password" name="password" type="password" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-emerald-800" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="confirmPassword">
              Confirm new password
            </label>
            <input id="confirmPassword" name="confirmPassword" type="password" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-emerald-800" />
          </div>

          {state.error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
              {state.error}
            </div>
          ) : null}

          {state.success && state.message ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
              {state.message}
            </div>
          ) : null}

          <button type="submit" className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
            Save new password
          </button>
        </form>
      </div>
    </div>
  );
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const token = (await searchParams)?.token || "";

  return <ResetPasswordContent token={token} />;
}
