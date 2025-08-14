"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FilterBy, Launch, SortDirection } from "@/types";
import FilterControls from "./FilterControls";
import { useLaunches } from "@/hooks/useLaunches";
import { useFilters } from "@/hooks/useFilters";
import { capitalize, formatLaunchDate } from "@/utils";
import FilterDropdown from "./FilterDropdown";
import { DEFAULT_SORT_KEY, HEADERS } from "@/constants";

interface Props {
  onSelectLaunch: (selected: Launch) => void;
  selectedLaunch?: Launch | null;
}

export default function LaunchesList({
  selectedLaunch,
  onSelectLaunch,
}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<FilterBy>(DEFAULT_SORT_KEY);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [pageSize, setPageSize] = useState<number>(5);

  const {
    filterBy,
    setFilterBy,
    filterValue,
    setFilterValue,
    filterOptions,
    appliedFilterBy,
    appliedFilterValue,
    applyFilters,
    clearFilters,
  } = useFilters();

  const { launches, totalPages, totalResult } = useLaunches({
    page: currentPage,
    sortBy,
    sortDirection,
    filterBy: appliedFilterBy,
    filterValue: appliedFilterValue,
    pageSize: pageSize,
  });

  const isLastPage: boolean = (currentPage + 1) * pageSize >= totalResult;

  useEffect(() => {
    setCurrentPage(0);
  }, [sortBy, sortDirection, appliedFilterBy, appliedFilterValue]);

  const handleSortBy = (key: FilterBy | "") => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setSortBy(key);
  };

  const getColumnVal = (launch: Launch, key: string) => {
    if (key === "launchDate") {
      return formatLaunchDate(launch.launchDate);
    }
    const header = String(launch[key as keyof Launch] ?? "");
    return capitalize(header);
  };

  return (
    <div className="grid">
      <FilterControls
        options={filterOptions}
        filterBy={filterBy}
        filterValue={filterValue}
        onFilterByChange={(val) => {
          setFilterBy(val);
          setFilterValue("");
        }}
        onFilterValChange={setFilterValue}
        onClearFilters={clearFilters}
        onApplyFilters={applyFilters}
      />

      <div className="max-h-[20rem] overflow-auto mt-4 bg-indigo-400 rounded-md">
        <table className="w-full px-4">
          <thead className="bg-[#818df8c0] sticky top-0 backdrop-blur-sm">
            <tr>
              {HEADERS.map(({ name, key }) => (
                <th key={key} className="whitespace-nowrap text-left py-4 px-4">
                  <div className="flex gap-2 items-center">
                    <span>{name}</span>
                    <button onClick={() => handleSortBy(key as FilterBy | "")}>
                      <FontAwesomeIcon icon={faSort} fontSize="0.75rem" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-[1rem]">
            {launches.map((launch) => (
              <tr
                key={launch.slug}
                onClick={() => onSelectLaunch(launch)}
                className={`hover:bg-[#e3b9d14f] cursor-pointer ${
                  selectedLaunch?.slug === launch.slug ? "bg-[#e3b9d14f]" : ""
                }`}
              >
                {HEADERS.map((header) => (
                  <td className="whitespace-nowrap py-1 px-4" key={header.key}>
                    {getColumnVal(launch, header.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-full flex items-center gap-4 bg-[#818df8c0] sticky bottom-0 backdrop-blur-sm py-4 px-4">
          <FilterDropdown
            label="Show"
            id="fd-pages-shown"
            name="fd-pages-shown"
            selected={pageSize}
            options={[
              { name: "5", value: 5 },
              { name: "10", value: 10 },
              { name: "15", value: 15 },
            ]}
            onChange={(val) => setPageSize(Number(val))}
          />
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="space-x-2 py-1 rounded-md disabled:opacity-40 hover:bg-[#e3b9d14f]"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <p>
            {currentPage + 1} of {totalPages}
          </p>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={isLastPage}
            className="space-x-2 py-1 rounded-md disabled:opacity-40 hover:bg-[#e3b9d14f]"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
