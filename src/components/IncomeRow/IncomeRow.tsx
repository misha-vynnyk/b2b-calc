import React from "react";
import { ButtonContainer, DateInput, DeleteButton, StyledInput, StyledSelect, Td, Tr } from "./StyledIncomeRow";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TAX_RATE } from "../../constants/taxRate";
import type { IncomeSource } from "../../types/income";

interface Entry {
  id: number;
  source: IncomeSource;
  amount: number;
  date: string;
}

interface IncomeRowProps {
  entry: Entry;
  onUpdate: (id: number, field: keyof Entry, value: string | number) => void;
  onDelete: (id: number) => void;
}

export const IncomeRow: React.FC<IncomeRowProps> = ({
  entry,
  onUpdate,
  onDelete,
}) => {
  return (
<Tr>
  <Td data-label="Source">
    <StyledSelect
      value={entry.source}
      onChange={(e) =>
        onUpdate(entry.id, "source", e.target.value as IncomeSource)
      }
    >
      <option value="Glovo">Glovo</option>
      <option value="Web Development">Web Development</option>
      <option value="Rent">Rent</option>
      <option value="Photography">Photography</option>
    </StyledSelect>
  </Td>
  <Td data-label="Amount">
    <StyledInput
      type="number"
      value={entry.amount}
      onChange={(e) =>
        onUpdate(entry.id, "amount", parseFloat(e.target.value))
      }
      min={0}
    />
  </Td>
  <Td data-label="Date">
    <DatePicker
      selected={new Date(entry.date)}
      onChange={(date: Date | null) => {
        if (date) {
          onUpdate(entry.id, "date", date.toISOString().split("T")[0]);
        }
      }}
      dateFormat="yyyy-MM-dd"
      customInput={<DateInput />}
    />
  </Td>
  <Td data-label="Tax Rate">
    {(TAX_RATE[entry.source] * 100).toFixed(1)}%
  </Td>
  <ButtonContainer data-label="Actions">
    <DeleteButton onClick={() => onDelete(entry.id)}>Delete</DeleteButton>
  </ButtonContainer>
</Tr>

  );
};
