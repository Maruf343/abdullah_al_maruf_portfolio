"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).finally(() => router.replace("/login?success=" + encodeURIComponent("You have been signed out.")));
  }, [router]);

  return null;
}
