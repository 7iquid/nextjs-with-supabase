"use client"; // this is a client-side hook

import { useEffect, useState } from "react";
import type { paths } from "@/types/api";

type GetResponse<Path extends keyof paths> = paths[Path] extends {
  get: { responses: { 200: { content: { "application/json": infer T } } } };
}
  ? T
  : never;

interface FetchOptions {
  params?: Record<string, string | number>;
}

export const useFetchClientV1 = <Path extends keyof paths>(
  path: Path,
  options?: FetchOptions
) => {
  const [data, setData] = useState<GetResponse<Path>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace {param} placeholders in the path
        let finalPath = path as string;
        if (options?.params) {
          Object.entries(options.params).forEach(
            ([key, value]) =>
              (finalPath = finalPath.replace(`{${key}}`, String(value)))
          );
        }

        const res = await fetch(`/api${finalPath}`);
        if (!res.ok) throw new Error(`Failed to fetch ${finalPath}`);
        const json = await res.json();

        setData(json.data || json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path, JSON.stringify(options?.params)]); // refetch if path or params change

  return { data, loading, setLoading, error, setData, setError };
};
