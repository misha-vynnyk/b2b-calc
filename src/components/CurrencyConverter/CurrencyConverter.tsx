import { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 2rem;
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 10px;
  color: #eee;
  max-width: 500px;
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem;
`;

const Input = styled.input`
  margin-top: 0.3rem;
  padding: 0.5rem;
  width: 100%;
  background-color: #2c2c2c;
  color: white;
  border: 1px solid #444;
  border-radius: 6px;
`;

const Select = styled.select`
  margin-top: 0.3rem;
  padding: 0.5rem;
  width: 100%;
  background-color: #2c2c2c;
  color: white;
  border: 1px solid #444;
  border-radius: 6px;
`;

const Result = styled.div`
  margin-top: 1.5rem;
  font-weight: bold;
`;

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PLN");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currencies = ["USD", "PLN", "EUR", "GBP", "UAH"];

  useEffect(() => {
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
        console.log("Failed to fetch exchange rates:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  const converted =
    amount && rates[toCurrency] ? amount * rates[toCurrency] : null;

  return (
    <Wrapper>
      <h2>Currency Converter</h2>

      <Label>
        Amount:
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </Label>

      <Label>
        From:
        <Select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </Select>
      </Label>

      <Label>
        To:
        <Select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </Select>
      </Label>

      <Result>
        {loading
          ? "Loading..."
          : error
          ? `Error: ${error}`
          : converted !== null
          ? `${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`
          : "Enter amount"}
      </Result>
    </Wrapper>
  );
};
