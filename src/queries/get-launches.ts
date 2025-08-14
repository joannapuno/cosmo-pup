import type { LaunchesResponse, LaunchDataConfig } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';

const getLaunches = async (config?: LaunchDataConfig): Promise<LaunchesResponse> => {
  const params = new URLSearchParams();

  if (config) {
    Object.entries(config).forEach(([key, val]) => {
      if (val === undefined || val === null || val === '') return;
      params.append(key, String(val));
    });
  }

  const url = `${API_BASE}/api/launches${params.size ? `?${params}` : ''}`;
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    const err = await res.text();
    throw Error(`Failed to fetch launches: ${err}`);
  }

  return res.json() as Promise<LaunchesResponse>;
};

export { getLaunches };
export type { LaunchesResponse };
