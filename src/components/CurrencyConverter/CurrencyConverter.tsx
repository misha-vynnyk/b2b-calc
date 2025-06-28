import Select, { type StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";
import { useCurrency } from "../../contexts/useCurrency";
import {
  Input,
  Result,
  Wrapper,
  Label,
  CurrencyTitle,
  FromToContainer,
  MainWrapper,
  FloatingLabelFrom,
  FloatingLabelTo,
  SendButton,
} from "./StyledCurrencyConverter";
import type { CurrencyOption } from "../../contexts/CurrencyContext.types";
import { useState } from "react";

const animatedComponents = makeAnimated();

const customStyles: StylesConfig<CurrencyOption, false> = {
  control: (base, state) => ({
    ...base,
    minWidth: "150px",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: state.isFocused ? "#4f9eff" : "#666",
    boxShadow: state.isFocused ? "0 0 0 2px #4f9eff40" : "none",
    transition: "all 0.3s ease",
    borderRadius: "16px",
    padding: "4px 6px",
    color: "white",
    fontSize: "16px",
    backdropFilter: "blur(12px)",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#2c2c2c",
    borderRadius: "10px",
    overflow: "hidden",
    animation: "fadeIn 0.3s ease forwards",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#444" : "#2c2c2c",
    color: "white",
    cursor: "pointer",
    transition: "all 0.2s ease",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#999",
  }),
  input: (base) => ({
    ...base,
    color: "white",
  }),
};

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
  const [fromFocused, setFromFocused] = useState<boolean>(false);
  const [toFocused, setToFocused] = useState<boolean>(false);

  const fromIsActive = fromFocused || fromCurrency !== "";
  const toIsActive = toFocused || toCurrency !== "";

  console.log("from:", fromCurrency, "to:", toCurrency);

  const converted = amount && rates[toCurrency] ? amount * rates[toCurrency] : null;

  const handleFromChange = (selected: CurrencyOption | null) => {
    if (selected) {
      setFromCurrency(selected.value);
    }
  };
  const handleToChange = (selected: CurrencyOption | null) => {
    if (selected) {
      setToCurrency(selected.value);
    }
  };

  return (
    <MainWrapper>
      <CurrencyTitle>Currency Converter</CurrencyTitle>

      <Wrapper>
        <Input
          placeholder=' '
          type='number'
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Label>Amount</Label>
      </Wrapper>

      {converted !== null && (
        <SendButton onClick={() => setSentAmount(converted)}>Send amount to tax calculator</SendButton>
      )}

      <FromToContainer>
        <Wrapper>
          <Select<CurrencyOption>
            id='from-select'
            placeholder=''
            components={animatedComponents}
            options={currencies}
            onChange={handleFromChange}
            styles={customStyles}
            isSearchable={false}
            onFocus={() => setFromFocused(true)}
            onBlur={() => setFromFocused(false)}
          />
          <FloatingLabelFrom
            $isActive={fromIsActive}
            htmlFor='from-select'
          >
            From
          </FloatingLabelFrom>
        </Wrapper>
        <Wrapper>
          <Select<CurrencyOption>
            id='to-select'
            placeholder=''
            components={animatedComponents}
            options={currencies}
            onChange={handleToChange}
            styles={customStyles}
            isSearchable={false}
            onFocus={() => setToFocused(true)}
            onBlur={() => setToFocused(false)}
          />
          <FloatingLabelTo
            $isActive={toIsActive}
            htmlFor='to-select'
          >
            To
          </FloatingLabelTo>
        </Wrapper>
      </FromToContainer>

      <Result>
        {loading
          ? "Loading..."
          : error
          ? `Error: ${error}`
          : converted !== null
          ? `${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`
          : "Enter amount"}
      </Result>
    </MainWrapper>
  );
};
