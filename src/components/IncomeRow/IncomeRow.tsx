import React from "react";
import { Td, DeleteButton } from "../styles";
import { TAX_RATE } from "../../App";

type IncomeSource = "Glovo" | "Web Development" | "Rent" | "Photography";

interface Entry {
  id: number;
  source: IncomeSource;
  amount: number;
  date: string;
}

interface IncomeRowProps {
  entry: Entry;
  onUpdate: (id: number, field: keyof Entry, value: any) => void;
  onDelete: (id: number) => void;
}

export const IncomeRow: React.FC<IncomeRowProps> = ({
  entry,
  onUpdate,
  onDelete,
}) => {
  return (
    <tr>
      <Td>
        <select
          value={entry.source}
          onChange={(e) =>
            onUpdate(entry.id, "source", e.target.value as IncomeSource)
          }
        >
          <option value="Glovo">Glovo</option>
          <option value="Web Development">Web Development</option>
          <option value="Rent">Rent</option>
          <option value="Photography">Photography</option>
        </select>
      </Td>
      <Td>
        <input
          type="number"
          value={entry.amount}
          onChange={(e) =>
            onUpdate(entry.id, "amount", parseFloat(e.target.value))
          }
          min={0}
        />
      </Td>
      <Td>
        <input
          type="date"
          value={entry.date}
          onChange={(e) => onUpdate(entry.id, "date", e.target.value)}
        />
      </Td>
      <Td>{(TAX_RATE[entry.source] * 100).toFixed(1)}%</Td>
      <Td>
        <DeleteButton onClick={() => onDelete(entry.id)}>Delete</DeleteButton>
      </Td>
    </tr>
  );
};
