import type { LaunchesResponse, Option, Launch, SortDirection, LaunchDataConfig } from './types';


const getLaunches = async (config?: LaunchDataConfig): Promise<LaunchesResponse> => {
  const params = new URLSearchParams()

  if(config && Object.keys(config)) {
    Object.entries(config).forEach(([key, entry]) => {
      if(!entry) return
      params.append(key, entry)
    })
  }

  const res = await fetch(
    `https://interview-api.neofinancial.dev/api/launches?${params}`
  );

  if (!res.ok) {
    const err = await res.text();
    throw Error(`Failed to fetch launches: ${err}`);
  }

  const json: LaunchesResponse = await res.json();
  return json;
}

export { getLaunches };
export type { LaunchesResponse };
