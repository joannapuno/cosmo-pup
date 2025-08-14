export interface LaunchesResponse {
  meta: { total: number; limit: number };
  result: Launch[];
}
export interface Launch {
  slug: string;
  name: string;
  launchDate: string;
  rocketType: string;
  organization: string;
}


// Pagination and Filters
export type SortDirection = 'asc' | 'desc'
export type FilterBy = 'launchDate' | 'name' | 'rocketType' | 'organization' | ''

export type Option = {
  name: string
  value: string | number
}

export type Filter = {
  name: string
  rocketType: string
  organization: string
}

export interface LaunchDataConfig {
  offset?: number
  limit?: number
  sort?: string
  order?: SortDirection
  filterBy?: string
  filterOperator?: string
  filterValue?: string
}