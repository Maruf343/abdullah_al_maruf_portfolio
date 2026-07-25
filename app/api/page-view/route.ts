import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { withDbFallback } from "../../../lib/dbSafe";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path : "/";
    const visitorKey = typeof body.visitorKey === "string" ? body.visitorKey : null;

    await withDbFallback(
      () =>
        prisma.pageView.create({
          data: {
            path,
            visitorKey,
          },
        }),
      null
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
