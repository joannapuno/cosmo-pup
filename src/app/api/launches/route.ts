import { NextResponse } from 'next/server';
import launches from '@/data/launches.json';             // our local mock data
import { qp, applyFilter, applySort, applyPage } from '@/lib/query'; // helper functions

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    // Read query params
    const limit          = qp(url, 'limit');
    const offset         = qp(url, 'offset');
    const sort           = qp(url, 'sort');
    const order          = (qp(url, 'order') as 'asc' | 'desc') ?? 'asc';
    const filterBy       = qp(url, 'filterBy');
    const filterOperator = qp(url, 'filterOperator');
    const filterValue    = qp(url, 'filterValue');

    // 1. Filter
    let rows = applyFilter(launches, filterBy, filterOperator, filterValue);

    // 2. Sort
    rows = applySort(rows, sort, order);

    // 3. Paginate
    const total = rows.length;
    const page  = applyPage(rows, offset, limit);

    // Response
    return NextResponse.json(
      {
        meta: { total, limit: limit ? Number(limit) : total },
        result: page,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid query parameter' }, { status: 400 });
  }
}