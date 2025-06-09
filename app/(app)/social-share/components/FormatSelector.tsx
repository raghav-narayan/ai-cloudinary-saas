'use client';
import React from 'react';

export default function FormatSelector({
  selected,
  onChange,
  formats,
}: {
  selected: string;
  onChange: (val: string) => void;
  formats: string[];
}) {
  return (
    <div className="form-control w-full mt-6">
      <label className="label">
        <span className="label-text font-medium text-base-content">Choose a format</span>
      </label>
      <select
        className="select select-bordered select-accent w-full"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {formats.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
    </div>
  );
}
