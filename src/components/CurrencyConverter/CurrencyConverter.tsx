import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useCurrency } from "../../contexts/useCurrency";
import {
  Input,
  Result,
  Label,
  CurrencyTitle,
  TwoInputsContainer,
  MainWrapper,
  FloatingLabelFrom,
  FloatingLabelTo,
  SendButton,
  GlassBackground,
  InputWrapper,
  customStyles,
} from "./StyledCurrencyConverter";
import type { CurrencyOption } from "../../contexts/CurrencyContext.types";
import { useState } from "react";

const animatedComponents = makeAnimated();

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
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "visible" }}>
        <filter id='liquidGlassFilter'>
          {/* Використовуємо feTurbulence для динамічного ефекту */}
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.03 0.03'
            numOctaves='1'
            seed='0'
            result='turbulence'
          />
          {/* feDisplacementMap зміщує пікселі зображення відповідно до turbulence */}
          <feDisplacementMap
            in='SourceGraphic'
            in2='turbulence'
            scale='40'
            xChannelSelector='R'
            yChannelSelector='G'
          />
          {/* scale: регулює інтенсивність викривлення. Змінюйте це значення, щоб побачити ефект */}
        </filter>
      </svg>
      <GlassBackground>
        <CurrencyTitle>Currency Converter</CurrencyTitle>
        <InputWrapper>
          <Input
            placeholder=' '
            type='number'
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Label>Amount</Label>
        </InputWrapper>

        {converted !== null && (
          <SendButton onClick={() => setSentAmount(converted)}>
            Send amount to tax calculator
          </SendButton>
        )}

        <TwoInputsContainer>
          <InputWrapper>
            <Select<CurrencyOption>
              id='from-select'
              placeholder=''
              components={animatedComponents}
              options={currencies}
              onChange={handleFromChange}
              styles={customStyles}
              isSearchable={false}
              menuPortalTarget={document.body}
              menuPosition='fixed'
              onFocus={() => setFromFocused(true)}
              onBlur={() => setFromFocused(false)}
            />
            <FloatingLabelFrom
              $isActive={fromIsActive}
              htmlFor='from-select'
            >
              From
            </FloatingLabelFrom>
          </InputWrapper>
          <InputWrapper>
            <Select<CurrencyOption>
              id='to-select'
              placeholder=''
              components={animatedComponents}
              options={currencies}
              onChange={handleToChange}
              styles={customStyles}
              isSearchable={false}
              menuPortalTarget={document.body}
              menuPosition='fixed'
              onFocus={() => setToFocused(true)}
              onBlur={() => setToFocused(false)}
            />
            <FloatingLabelTo
              $isActive={toIsActive}
              htmlFor='to-select'
            >
              To
            </FloatingLabelTo>
          </InputWrapper>
        </TwoInputsContainer>

        <Result>
          {loading
            ? "Loading..."
            : error
            ? `Error: ${error}`
            : converted !== null
            ? `${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`
            : "Enter amount"}
        </Result>
      </GlassBackground>
    </MainWrapper>
  );
};
