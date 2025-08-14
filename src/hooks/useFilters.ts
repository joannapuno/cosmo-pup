import { useEffect, useState } from "react"
import { getLaunches } from "@/queries/get-launches"
import { FilterBy, Launch, Option } from "@/queries/types"
import { capitalize } from "@/utils"

export function useFilters() {
  const [filterBy, setFilterBy] = useState<FilterBy>("")
  const [filterValue, setFilterValue] = useState<string>("")
  const [filterOptions, setFilterOptions] = useState<Option[]>([])

  // Applied filters
  const [appliedFilterBy, setAppliedFilterBy] = useState<FilterBy>("")
  const [appliedFilterValue, setAppliedFilterValue] = useState<string>("")

  useEffect(() => {
    if (!filterBy) return

    const fetchOptions = async () => {
      const { result } = await getLaunches()

      // removing dupes
      const uniqueValues = Array.from(
        new Set(result.map(l => String(l[filterBy as keyof Launch] ?? "")))
      )
      const options = uniqueValues.map(val => ({
        name: capitalize(val),
        value: val,
      }))
      setFilterOptions(options)
    }

    fetchOptions()
  }, [filterBy])

  const clearFilters = () => {
    setFilterBy("")
    setFilterValue("")
    setAppliedFilterBy("")
    setAppliedFilterValue("")
  }

  const applyFilters = () => {
    setAppliedFilterBy(filterBy)
    setAppliedFilterValue(filterValue)
  }

  return {
    filterBy,
    setFilterBy,
    filterValue,
    setFilterValue,
    filterOptions,
    appliedFilterBy,
    appliedFilterValue,
    clearFilters,
    applyFilters,
  }
}
