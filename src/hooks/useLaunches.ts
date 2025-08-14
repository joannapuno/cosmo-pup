import { getLaunches } from "@/queries/get-launches"
import { Launch } from "@/types"
import { useState, useEffect } from "react"

export function useLaunches({
  page,
  sortBy,
  sortDirection,
  filterBy,
  filterValue,
  pageSize,
}: {
  page: number
  sortBy: string
  sortDirection: 'asc' | 'desc'
  filterBy: string
  filterValue: string
  pageSize: number
}) {
  const [launches, setLaunches] = useState<Launch[]>([])
  const [totalResult, setTotalResult] = useState<number>(0)
  const totalPages = Math.ceil(totalResult / pageSize)

  useEffect(() => {

    const fetch = async () => {
      const config = {
        offset: page * pageSize,
        limit: pageSize,
        sort: sortBy,
        order: sortDirection,
        // Add if there are filters
        ...(filterBy && filterValue && {
          filterBy,
          filterValue,
          filterOperator: filterBy === 'launchDate' ? 'gte' : 'eq',
        }),
      }

      const { result, meta } = await getLaunches(config)
      setLaunches(result)
      setTotalResult(meta.total)
    }

    fetch()
  }, [page, sortBy, sortDirection, filterBy, filterValue, pageSize])

  return {
    launches,
    totalPages,
    totalResult
  }
}