import type { IncomeSource } from "../types/income";

export const TAX_RATE: Record<IncomeSource, number> = {
  Glovo: 0.085,
  "Web Development": 0.085,
  Rent: 0.08,
  Photography: 0.15,
};