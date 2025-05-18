import { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { FilterBar } from "./components/FilterBar/FilterBar";
import { IncomeRow } from "./components/IncomeRow/IncomeRow";
import { SummaryBar } from "./components/SummaryBar/SummaryBar";
import { ExportButton } from "./components/ExportButton/ExportButton";
import { IncomeChart } from "./components/IncomeChart/IncomeChart";

export type IncomeSource = "Glovo" | "Web Development" | "Rent" | "Photography";

interface Entry {
  id: number;
  source: IncomeSource;
  amount: number;
  date: string;
}

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    background-color: #121212;
    color: #eee;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    text-align: center;
    align-items: center;
    padding: 1rem;
  }

  input, select {
    background-color: #222;
    color: #eee;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 0.3rem 0.5rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 0.6rem;
    border-bottom: 1px solid #333;
  }

  th {
    text-align: left;
    background-color: #1e1e1e;
  }
`;

const AddButton = styled.button`
  margin-top: 1rem;
  background-color: #4e91fc;
  color: white;
  border: none;
  padding: 0.7rem 1.4rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3571cc;
  }
`;

export const TAX_RATE: Record<IncomeSource, number> = {
  Glovo: 0.085,
  "Web Development": 0.085,
  Rent: 0.08,
  Photography: 0.15,
};

export const App = () => {
  const [entries, setEntries] = useState<Entry[]>(() => {
    try {
      const stored = localStorage.getItem("ryczalt_entries");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [filterMonth, setFilterMonth] = useState("");
  const [filterSource, setFilterSource] = useState<IncomeSource | "">("");

  useEffect(() => {
    localStorage.setItem("ryczalt_entries", JSON.stringify(entries));
  }, [entries]);

  const filteredEntries = entries.filter((entry) => {
    const matchesMonth = filterMonth
      ? entry.date.slice(5, 7) === filterMonth
      : true;
    const matchesSource = filterSource ? entry.source === filterSource : true;
    return matchesMonth && matchesSource;
  });

  const totalIncome = filteredEntries.reduce((acc, e) => acc + e.amount, 0);
  const totalTax = filteredEntries.reduce(
    (acc, e) => acc + e.amount * TAX_RATE[e.source],
    0
  );

  const addEntry = () => {
    const newEntry: Entry = {
      id: Date.now(),
      source: "Glovo",
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const updateEntry = (id: number, field: keyof Entry, value: any) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const deleteEntry = (id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <>
      <GlobalStyle />
      <h1>Ryczałt Income Tracker</h1>

      <FilterBar
        month={filterMonth}
        setMonth={setFilterMonth}
        source={filterSource}
        setSource={(value: string) =>
          setFilterSource(value as IncomeSource | "")
        }
      />

      <Table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Amount (zł)</th>
            <th>Date</th>
            <th>Tax Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry) => (
            <IncomeRow
              key={entry.id}
              entry={entry}
              onUpdate={updateEntry}
              onDelete={deleteEntry}
            />
          ))}
        </tbody>
      </Table>

      <AddButton onClick={addEntry}>+ Add Income</AddButton>

      <SummaryBar total={totalIncome} tax={totalTax} />

      <IncomeChart entries={filteredEntries} filterSource={filterSource} />

      <ExportButton entries={filteredEntries} />
    </>
  );
};
