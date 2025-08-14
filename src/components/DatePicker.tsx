'use client';

interface Props {
  value: string;
  id: string;
  onChange: (val: string) => void;
}
export default function DatePicker({ id, value, onChange }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor={id}>Earliest launch date</label>

      <div className="border border-white rounded-sm">
        <input
          type="date"
          id={id}
          value={value}
          onChange={(evt) => onChange(evt.target.value)}
          className="text-sm bg-transparent w-full h-full p-1"
        />
      </div>
    </div>
  );
}
