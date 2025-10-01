import { BASE_URL } from "@/constant";
import type { paths } from "@/types/api";

type GetResponse<Path extends keyof paths> = paths[Path] extends {
  get: { responses: { 200: { content: { "application/json": infer T } } } };
}
  ? T
  : never;

export async function fetchSSRV1<Path extends keyof paths>(
  path: Path
): Promise<GetResponse<Path> | false> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Failed to fetch [${BASE_URL}/${path}]`);

    const resp = await res.json();
    return resp.data as GetResponse<Path>;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return false;
  }
}
