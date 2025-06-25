import { useEffect, useState } from "react";
import { TAX_RATE, type IncomeSource } from "../../App";
import { FilterBar } from "../FilterBar/FilterBar";
import { AddButton, Table, TableContainer, TBody, Th, Thead } from "./StyledIncomeTable";
import { IncomeRow } from "../IncomeRow/IncomeRow";
import { SummaryBar } from "../SummaryBar/SummaryBar";
import { IncomeChart } from "../IncomeChart/IncomeChart";
import { ExportButton } from "../ExportButton/ExportButton";

interface Entry {
  id: number;
  source: IncomeSource;
  amount: number;
  date: string;
}
export const IncomeTable = () => {
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

  const updateEntry = (
    id: number,
    field: keyof Entry,
    value: number | string
  ) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const deleteEntry = (id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <TableContainer>
      <FilterBar
        month={filterMonth}
        setMonth={setFilterMonth}
        source={filterSource}
        setSource={(value: string) =>
          setFilterSource(value as IncomeSource | "")
        }
      />
      <Table>
        <Thead>
          <tr>
            <Th>Source</Th>
            <Th>Amount (zł)</Th>
            <Th>Date</Th>
            <Th>Tax Rate</Th>
            <Th>Actions</Th>
          </tr>
        </Thead>
        <TBody>
          {filteredEntries.map((entry) => (
            <IncomeRow
              key={entry.id}
              entry={entry}
              onUpdate={updateEntry}
              onDelete={deleteEntry}
            />
          ))}
        </TBody>
      </Table>
      <AddButton onClick={addEntry}>+ Add Income</AddButton>
      <SummaryBar total={totalIncome} tax={totalTax} />
      <IncomeChart entries={filteredEntries} filterSource={filterSource} />
      <ExportButton entries={filteredEntries} />
    </TableContainer>
  );
};
