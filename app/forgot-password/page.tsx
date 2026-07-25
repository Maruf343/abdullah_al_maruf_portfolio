"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "react-hot-toast";
import { requestPasswordReset, type ClientAuthActionState } from "../../lib/clientAuth";

const initialState: ClientAuthActionState = {
  success: false,
  message: "",
  error: "",
};

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState(requestPasswordReset, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }

    if (state.success && state.message) {
      toast.success(state.message);
    }
  }, [state.error, state.success, state.message]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-none">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Password Reset</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Reset your password</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Enter the email tied to your client account and we’ll send a secure reset link.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
          If the address matches an active client account, you’ll receive a one-hour reset link.
        </div>

        <form action={formAction} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-emerald-800" />
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
            Send reset link
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600 dark:text-slate-400">
          Back to <Link href="/login" className="font-semibold text-emerald-700 dark:text-emerald-300">sign in</Link>
        </p>
      </div>
    </div>
  );
}
