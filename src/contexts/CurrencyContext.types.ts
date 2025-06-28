export interface CurrencyOption {
  value: string;
  label: string;
}

export interface CurrencyContextType {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  rates: Record<string, number>;
  loading: boolean;
  error: string | null;
  currencies: CurrencyOption[];
  setAmount: (value: number) => void;
  setFromCurrency: (currency: string) => void;
  setToCurrency: (currency: string) => void;
  sentAmount: number | null;
  setSentAmount: (value: number) => void;
}
