import React from "react";
import styled from "styled-components";

const Button = styled.button`
  margin-top: 1.5rem;
  background-color: #4e91fc;
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3571cc;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

interface ExportButtonProps {
  entries: any[];
}

export const ExportButton: React.FC<ExportButtonProps> = ({ entries }) => {
  const handleExport = () => {
    if (!entries.length) return;

    const header = ["Source", "Amount", "Date"];
    const csvRows = [
      header.join(","),
      ...entries.map(({ source, amount, date }) =>
        [source, amount.toFixed(2), date].join(",")
      ),
    ];
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `ryczalt_income_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleExport}>⬇️ Export to CSV</Button>;
};
