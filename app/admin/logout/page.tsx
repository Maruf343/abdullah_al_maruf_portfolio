"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).finally(() => router.replace("/login"));
  }, [router]);

  return null;
}
