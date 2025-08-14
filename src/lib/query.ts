// Just doing singular filter for now
// TODO: Be able to do more than 1 filter

export const qp = (url: URL, key: string) =>
  url.searchParams.get(key) ?? undefined;

// Filter function
export function applyFilter<T extends Record<string, any>>(
  rows: T[],
  by?: string,
  op?: string,
  val?: string
) {
  if (!by || !op || val === undefined) return rows;
  return rows.filter((r) => {
    const v = r[by as keyof T];
    if (v === undefined) return false;
    if (op === 'eq')  return String(v) === String(val);
    if (op === 'gte') return String(v) >= String(val);
    if (op === 'lte') return String(v) <= String(val);
    return true;
  });
}

// Sort function
export function applySort<T extends Record<string, any>>(
  rows: T[],
  field?: string,
  order: 'asc' | 'desc' = 'asc'
) {
  if (!field) return rows;
  return [...rows].sort((a, b) => {
    const A = a[field as keyof T];
    const B = b[field as keyof T];
    if (A === B) return 0;
    const cmp = A > B ? 1 : -1;
    return order === 'desc' ? -cmp : cmp;
  });
}

// Pagination
export function applyPage<T>(
  rows: T[],
  offset?: string,
  limit?: string
) {
  const start = offset ? parseInt(offset, 10) : 0;
  const end = limit ? start + parseInt(limit, 10) : undefined;
  return rows.slice(start, end);
}
