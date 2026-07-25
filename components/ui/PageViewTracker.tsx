"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getVisitorKey() {
  if (typeof window === "undefined") {
    return null;
  }

  const storageKey = "portfolio-visitor-key";
  let visitorKey = window.localStorage.getItem(storageKey);

  if (!visitorKey) {
    visitorKey = `visitor-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(storageKey, visitorKey);
  }

  return visitorKey;
}

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const visitorKey = getVisitorKey();

    fetch("/api/page-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: pathname, visitorKey }),
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
