import { TaxCalculator } from "./components/TaxCalculator/TaxCalculator";
import { CurrencyConverter } from "./components/CurrencyConverter/CurrencyConverter";
import { Container, GlobalStyle, StyledMain, Title } from "./components/styles";
import { IncomeTable } from "./components/IncomeTable/IncomeTable";

export type IncomeSource = "Glovo" | "Web Development" | "Rent" | "Photography";

export const TAX_RATE: Record<IncomeSource, number> = {
  Glovo: 0.085,
  "Web Development": 0.085,
  Rent: 0.08,
  Photography: 0.15,
};

export const App = () => {
  return (
    <StyledMain>
      <Container>
        <GlobalStyle />
        <Title>Ryczałt Income Tracker</Title>

        <CurrencyConverter />

        <TaxCalculator />

        <IncomeTable />
      </Container>
    </StyledMain>
  );
};
