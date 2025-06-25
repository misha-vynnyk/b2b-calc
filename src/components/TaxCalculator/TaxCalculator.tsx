import { useEffect, useState } from "react";
import {
  Input,
  RadioGroup,
  Result,
  ResultContainer,
  Title,
  Wrapper,
  Label,
} from "./StyledTaxCalculator";
import { useCurrency } from "../../contexts/useCurrency";

// Тип для ZUS
type ZusType = "UlgaStart" | "MalyZUS" | "PelnyZUS" | "None";

// Соцвнески для кожного типу
const SOCIAL_CONTRIBUTIONS: Record<ZusType, number> = {
  UlgaStart: 0,
  MalyZUS: 341.72,
  PelnyZUS: 1294.64,
  None: 0,
};

// Функція для розрахунку здоров страховки
const getHealthInsurance = (annualTax: number): number => {
  if (annualTax >= 300000) return 1384.97;
  if (annualTax >= 60000) return 769.43;
  return 461.66;
};

// Компонент
export const TaxCalculator = () => {
  const [income, setIncome] = useState<number>(0);
  const [rate, setRate] = useState<number>(8.5);
  const [zusType, setZusType] = useState<ZusType>("None");
  const { sentAmount } = useCurrency();

  const tax = income * (rate / 100);
  const annualTax = tax * 12;
  const healthInsurance = getHealthInsurance(annualTax);
  const socialInsurance = SOCIAL_CONTRIBUTIONS[zusType];
  const zus = healthInsurance + socialInsurance;
  const total = tax + zus;
  const afterTax = income - total;

  useEffect(() => {
    if (sentAmount !== null) {
      setIncome(sentAmount);
    }
  }, [sentAmount]);

  return (
    <Wrapper>
      <Title>Tax Calculator</Title>

      <Label>
        Income (zł):
        <Input
          value={income}
          type="number"
          onChange={(e) => setIncome(Number(e.target.value))}
        />
      </Label>

      <Label>
        Ryczałt rate (%):
        <Input
          type="number"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
      </Label>

      <RadioGroup>
        <strong>Social contribution (ZUS):</strong>

        <form>
          <label>
            <input
              type="radio"
              name="zus"
              value="None"
              checked={zusType === "None"}
              onChange={() => setZusType("None")}
            />
            Ulga na start (only tax + health)
          </label>

          <label>
            <input
              type="radio"
              name="zus"
              value="MalyZUS"
              checked={zusType === "MalyZUS"}
              onChange={() => setZusType("MalyZUS")}
            />
            Maly ZUS (341.72 zł)
          </label>

          <label>
            <input
              type="radio"
              name="zus"
              value="PelnyZUS"
              checked={zusType === "PelnyZUS"}
              onChange={() => setZusType("PelnyZUS")}
            />
            Pelny ZUS (1294.64 zł)
          </label>
        </form>
      </RadioGroup>
      <ResultContainer>
        <Result>📦 Ryczałt Tax: {tax.toFixed(2)} zł</Result>
        <Result>🏥 Health Insurance: {healthInsurance.toFixed(2)} zł</Result>
        <Result>👷 Social Insurance: {socialInsurance.toFixed(2)} zł</Result>
        <Result>💸 Total ZUS: {zus.toFixed(2)} zł</Result>
        <Result>💰 After Tax: {afterTax.toFixed(2)} zł</Result>
      </ResultContainer>
    </Wrapper>
  );
};
