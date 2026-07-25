import { Prisma } from "@prisma/client";

function isRecoverableDatabaseError(error: unknown) {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return false;
  }

  return ["P1001", "P1017", "P2021", "P2024"].includes(error.code);
}

export async function withDbFallback<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch (error) {
    if (isRecoverableDatabaseError(error)) {
      console.warn("Database query unavailable; using fallback data.", error instanceof Error ? error.message : String(error));
      return fallback;
    }

    console.error("Database query failed; using fallback data.", error);
    return fallback;
  }
}
