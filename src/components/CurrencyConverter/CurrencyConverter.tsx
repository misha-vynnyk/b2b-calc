import { useCurrency } from "../../contexts/useCurrency";
import {
  Input,
  Result,
  Select,
  Wrapper,
  Label,
  CurrencyTitle,
} from "./StyledCurrencyConverter";

export const CurrencyConverter = () => {
  const {
    amount,
    fromCurrency,
    toCurrency,
    rates,
    loading,
    error,
    currencies,
    setAmount,
    setSentAmount,
    setFromCurrency,
    setToCurrency,
  } = useCurrency();

  const converted =
    amount && rates[toCurrency] ? amount * rates[toCurrency] : null;

  return (
    <Wrapper>
      <CurrencyTitle>Currency Converter</CurrencyTitle>

      <Label>
        Amount:
        <Input
          type="number"
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

      {converted !== null && (
        <button onClick={() => setSentAmount(converted)}>
          Send amount to tax calculator
        </button>
      )}

    </Wrapper>
  );
};
