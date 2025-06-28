import {
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { CurrencyContext } from "./CurrencyContext";

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentAmount, setSentAmount] = useState<number | null>(null);

  const currencies = [
    { value: "USD", label: "USD" },
    { value: "PLN", label: "PLN" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "UAH", label: "UAH" },
  ];



  useEffect(() => {
    if (!fromCurrency) return;

    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(BASE_URL + fromCurrency);
        const data = await response.json();

        if (data.result === "success") {
          setRates(data.conversion_rates);
        } else {
          setError(data["error-type"] || "Unknown error");
          setRates({});
        }
      } catch (e) {
        setError("Failed to fetch exchange rates");
        setRates({});
        void e;
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  return (
    <CurrencyContext.Provider
      value={{
        amount,
        fromCurrency,
        toCurrency,
        rates,
        loading,
        error,
        currencies,
        setAmount,
        setFromCurrency,
        setToCurrency,
        sentAmount,
        setSentAmount
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
