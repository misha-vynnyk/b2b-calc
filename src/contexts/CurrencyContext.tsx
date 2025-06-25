import { createContext } from "react";
import type { CurrencyContextType } from "./CurrencyContext.types";

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);