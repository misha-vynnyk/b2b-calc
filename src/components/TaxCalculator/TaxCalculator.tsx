import { useEffect, useState } from "react";
import {
  Disclaimer,
  RadioGroup,
  Result,
  ResultContainer,
  Title,
  Wrapper,
} from "./StyledTaxCalculator";
import { useCurrency } from "../../contexts/useCurrency";
import {
  GlassBackground,
  Input,
  MainWrapper,
  InputWrapper,
  Label,
  TwoInputsContainer,
} from "../CurrencyConverter/StyledCurrencyConverter";

// Тип для ZUS
type ZusType = "UlgaStart" | "MalyZUS" | "PelnyZUS";

// --- ОФІЦІЙНІ АКТУАЛЬНІ ДАНІ для розрахунків ZUS на 2025 рік ---

// 1. База для медичного внеску на ryczałt (IV квартал 2024 року)
const AVG_WAGE_Q4_2024_OFFICIAL = 8549.18; // PLN (згідно з Komunikat Prezesa GUS z 22.01.2025)

// 2. Прогнозована середня місячна зарплата на 2025 рік (для "Повного ZUS")
// const PROGNOSED_AVG_WAGE_2025 = 8673.0; // PLN (згідно з Komunikat Prezesa GUS)

// 3. Мінімальна зарплата на 2025 рік (для "Малого ZUS" - 30% бази)
// Вона не змінюється протягом 2025 року згідно з останньою інформацією.
// const MIN_WAGE_2025_OFFICIAL = 4666.0; // PLN (з 1 січня до грудня 2025)

// Функція для отримання актуальних значень ZUS
// Тут вже не потрібен 'month', оскільки мінімальна зарплата стабільна протягом 2025,
// і медичні/соціальні внески (бази) також стабільні на весь рік.
const getZusConstants = () => {
  const HEALTH_INSURANCE_RATE = 0.09; // 9%

  // ОФІЦІЙНІ СУМИ СОЦІАЛЬНИХ ВНЕСКІВ для 2025 року (без добровільного лікарняного)
  // 1. Повний ZUS (Duży ZUS) - з бази 5203,80 zł
  const pelnyZusSocialAccurate = 1646.47; // Сума: Emerytalne + Rentowe + Wypadkowe + FP/FS

  // 2. Малий ZUS (пільговий, 24 місяці після Ulga na Start) - з бази 1399,80 zł
  const malyZusStartAccurate = 408.6; // Сума: Emerytalne + Rentowe + Wypadkowe

  return {
    // Ставки медичного внеску (обчислені на основі AVG_WAGE_Q4_2024_OFFICIAL = 8549.18 zł)
    healthContribution60k: AVG_WAGE_Q4_2024_OFFICIAL * 0.6 * HEALTH_INSURANCE_RATE, // 461.66 zł
    healthContribution300k: AVG_WAGE_Q4_2024_OFFICIAL * 1.0 * HEALTH_INSURANCE_RATE, // 769.43 zł
    healthContributionOver300k: AVG_WAGE_Q4_2024_OFFICIAL * 1.8 * HEALTH_INSURANCE_RATE, // 1384.97 zł

    pelnyZusSocial: pelnyZusSocialAccurate,
    malyZusStart: malyZusStartAccurate,
    // Mały ZUS Plus залишається прикладом/поясненням
    malyZusPlusExample: 0,
  };
};

// Функція для розрахунку медичного страхування
const getHealthInsurance = (
  currentAnnualIncome: number,
  zusConstants: ReturnType<typeof getZusConstants>
): number => {
  if (currentAnnualIncome >= 300000) {
    return zusConstants.healthContributionOver300k;
  }
  if (currentAnnualIncome >= 60000) {
    return zusConstants.healthContribution300k;
  }
  return zusConstants.healthContribution60k;
};

// Компонент TaxCalculator
export const TaxCalculator = () => {
  const [income, setIncome] = useState<number | "">(""); // Місячний дохід
  const [rate, setRate] = useState<number>(8.5); // Ставка ryczałt
  const [zusType, setZusType] = useState<ZusType>("UlgaStart"); // Дефолтний вибір Ulga na start
  const { sentAmount } = useCurrency();

  const zusConstants = getZusConstants(); // Тепер не передаємо місяць, бо константи стабільні

  const validIncome = typeof income === "number" ? income : 0;

  // 1. Визначення соціальних внесків (без медичного)
  let socialInsurance = 0;
  if (zusType === "MalyZUS") {
    // Цей тип відповідає 24 місяцям після Ulga na Start
    socialInsurance = zusConstants.malyZusStart;
  } else if (zusType === "PelnyZUS") {
    socialInsurance = zusConstants.pelnyZusSocial;
  }

  // 2. Орієнтовний розрахунок медичного внеску для поточного місяця.
  // Цей розрахунок має бути ПЕРЕД тим, як ми його віднімемо від бази оподаткування.
  // Для визначення порогу медичного внеску, використовуємо річний дохід після соціальних внесків.
  // (validIncome - socialInsurance) - це місячний дохід після соц. внесків.
  const annualIncomeForHealthBase = Math.max(0, validIncome - socialInsurance) * 12;
  const monthlyHealthInsurance = getHealthInsurance(annualIncomeForHealthBase, zusConstants);

  // 3. Розрахунок частини медичного внеску, що підлягає відрахуванню (50%)
  const deductibleHealthInsurance = monthlyHealthInsurance * 0.5;

  // 4. Визначення бази для податку ryczałt
  // Дохід зменшується на сплачені соціальні внески ТА 50% сплаченого медичного внеску
  const incomeForTaxCalculation = validIncome - socialInsurance - deductibleHealthInsurance;

  // 5. Розрахунок податку ryczałt
  const tax = Math.max(0, incomeForTaxCalculation) * (rate / 100);

  // 6. Загальний ZUS (соціальні + медичний)
  const totalZus = monthlyHealthInsurance + socialInsurance;

  // 7. Дохід після всіх відрахувань (те, що залишається "на руки")
  // Від валового доходу віднімаємо податок і повну суму ZUS
  const afterTax = validIncome - tax - totalZus;

  useEffect(() => {
    if (sentAmount !== null) {
      setIncome(sentAmount);
    }
  }, [sentAmount]);

  return (
    <Wrapper>
      <MainWrapper>
        <GlassBackground>
          <Title>Tax Calculator (Ryczałt)</Title>
          <TwoInputsContainer>
            <InputWrapper>
              <Input
                placeholder=' '
                type='text'
                value={income}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setIncome("");
                  } else if (!isNaN(Number(val))) {
                    setIncome(Number(val));
                  }
                }}
              />
              <Label>Amount:</Label>
            </InputWrapper>
            <InputWrapper>
              <Input
                type='number'
                step='0.1'
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
              <Label>Ryczałt (%):</Label>
            </InputWrapper>
          </TwoInputsContainer>
          <RadioGroup>
            <strong>Соціальні внески (ZUS):</strong>

            <form>
              <label>
                <input
                  type='radio'
                  name='zus'
                  value='UlgaStart'
                  checked={zusType === "UlgaStart"}
                  onChange={() => setZusType("UlgaStart")}
                />
                Ulga na start ({monthlyHealthInsurance.toFixed(2)})
              </label>

              <label>
                <input
                  type='radio'
                  name='zus'
                  value='MalyZUS'
                  checked={zusType === "MalyZUS"}
                  onChange={() => setZusType("MalyZUS")}
                />
                Малий ZUS (перші 24 міс. після Ulga na start
                {(monthlyHealthInsurance + socialInsurance).toFixed(2)})
              </label>

              <label>
                <input
                  type='radio'
                  name='zus'
                  value='PelnyZUS'
                  checked={zusType === "PelnyZUS"}
                  onChange={() => setZusType("PelnyZUS")}
                />
                Повний ZUS ({(monthlyHealthInsurance + socialInsurance).toFixed(2)})
              </label>
            </form>
          </RadioGroup>
          <ResultContainer>
            <Result>📦 Податок Ryczałt: {tax.toFixed(2)} zł</Result>
            <Result>🏥 Медичне страхування: {monthlyHealthInsurance.toFixed(2)} zł</Result>
            <Result>👷 Соціальні внески (без мед.): {socialInsurance.toFixed(2)} zł</Result>
            <Result>💸 Загалом ZUS: {totalZus.toFixed(2)} zł</Result>
            <Result>💰 Після оподаткування: {afterTax.toFixed(2)} zł</Result>
          </ResultContainer>
          <Disclaimer>
            <p style={{ fontSize: "0.8em", color: "#666", marginTop: "15px" }}>
              *Розрахунки є орієнтовними та базуються на офіційних даних ZUS/GUS за 2025 рік. Mały
              ZUS Plus (що залежить від доходу за попередній рік) не розраховується цим
              калькулятором. 50% сплаченого медичного внеску відраховується від оподатковуваного
              доходу. Точні суми внесків ZUS та ПДВ залежать від актуальних нормативних актів,
              індивідуальної ситуації та можуть щорічно змінюватися. Рекомендується консультація з
              бухгалтером.
            </p>
          </Disclaimer>
        </GlassBackground>
      </MainWrapper>
    </Wrapper>
  );
};
