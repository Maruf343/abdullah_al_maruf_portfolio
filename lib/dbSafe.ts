export async function withDbFallback<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch (error) {
    console.error("Database query failed; using fallback data.", error);
    return fallback;
  }
}
