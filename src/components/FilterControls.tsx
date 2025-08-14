"use client";

import { FilterBy, Option } from "@/types";
import FilterDropdown from "./FilterDropdown";
import DatePicker from "./DatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FILTER_BY_OPTIONS } from "@/constants";

interface Props {
  options: Option[];
  filterBy: FilterBy;
  filterValue: string;
  onFilterByChange: (val: FilterBy | "") => void;
  onFilterValChange: (val: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

export default function FilterControls({
  options,
  filterBy,
  filterValue,
  onFilterByChange,
  onFilterValChange,
  onClearFilters,
  onApplyFilters,
}: Props) {
  const sharedProps = {
    options,
    selected: filterValue,
    onChange: onFilterValChange,
  };

  // Rendering filter types
  // Notes: Will be better to be able to add multiple filterBy instead of 1
  const renderFilterInput = () => {
    switch (filterBy) {
      case "rocketType":
        return (
          <FilterDropdown
            id="fd-type"
            name="fd-type"
            label="Rocket Type"
            {...sharedProps}
          />
        );
      case "organization":
        return (
          <FilterDropdown
            id="fd-organization"
            name="fd-organization"
            label="Organization"
            {...sharedProps}
          />
        );
      case "launchDate":
        // Note: Would be better to use a date range picker here instead
        return (
          <DatePicker
            id="date-filter"
            value={filterValue}
            onChange={(val) => onFilterValChange(val)}
          />
        );
      default:
        return (
          <FilterDropdown
            id="fd-name"
            name="fd-name"
            label="Name"
            {...sharedProps}
          />
        );
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faFilter} />
        <FilterDropdown
          id="fd-filter-by"
          name="fd-filter-by"
          label="Filter By"
          options={FILTER_BY_OPTIONS}
          selected={filterBy}
          onChange={(val) => onFilterByChange(val as FilterBy | "")}
        />
      </div>

      {/* Filter value dropdown based on filterBy */}
      {options.length > 0 && filterBy && renderFilterInput()}

      {filterBy && filterValue && (
        <div className="flex gap-2">
          <button
            className="bg-violet-400 text-white px-4 py-1 rounded-md cursor-pointer"
            onClick={onApplyFilters}
          >
            Apply
          </button>

          <button
            className="text-white px-4 py-1 hover:underline rounded-md"
            onClick={onClearFilters}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
