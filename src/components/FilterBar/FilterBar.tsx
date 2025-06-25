import React from "react";
import { FilterContainer } from "./StyledFilterBar";

interface FilterBarProps {
  month: string;
  setMonth: (month: string) => void;
  source: string;
  setSource: (source: string) => void;
}

const monthOptions = [
  { value: "", label: "All Months" },
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const sourceOptions = [
  { value: "", label: "All Sources" },
  { value: "Glovo", label: "Glovo" },
  { value: "Web Development", label: "Web Development" },
  { value: "Rent", label: "Rent" },
  { value: "Photography", label: "Photography" },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  month,
  setMonth,
  source,
  setSource,
}) => {
  return (
    <FilterContainer>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {monthOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select value={source} onChange={(e) => setSource(e.target.value)}>
        {sourceOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FilterContainer>
  );
};
