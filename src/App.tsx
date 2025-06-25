import { TaxCalculator } from "./components/TaxCalculator/TaxCalculator";
import { CurrencyConverter } from "./components/CurrencyConverter/CurrencyConverter";
import { Container, GlobalStyle, StyledMain, Title } from "./components/styles";
import { IncomeTable } from "./components/IncomeTable/IncomeTable";
import { CurrencyProvider } from "./contexts/CurrencyProvider";

export const App = () => {
  return (
    <StyledMain>
      <Container>
        <CurrencyProvider>
          <GlobalStyle />
          <Title>Ryczałt Income Tracker</Title>
          <CurrencyConverter />
          <TaxCalculator />
          <IncomeTable />
        </CurrencyProvider>
      </Container>
    </StyledMain>
  );
};
