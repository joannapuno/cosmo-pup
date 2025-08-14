'use client';

import { Option } from '@/queries/types';

interface Props {
  label: string;
  id: string;
  name: string;
  onChange: (value: string) => void;
  selected?: string | number;
  options?: Option[];
}

export default function FilterDropdown({
  label,
  id,
  name,
  selected,
  onChange,
  options = [],
}: Props) {
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor={id}>{label}</label>

      <div className="border border-white rounded-sm">
        <select
          name={name}
          id={id}
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-1 bg-transparent"
        >
          <option value="">--</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
