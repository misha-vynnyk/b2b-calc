import React from "react";
import styled from "styled-components";

const SummaryContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #2c2c2c;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.2rem;
  color: #f0f0f0;
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

interface SummaryBarProps {
  total: number;
  tax: number;
}

export const SummaryBar: React.FC<SummaryBarProps> = ({ total, tax }) => {
  return (
    <SummaryContainer>
      <div>💰 Total Income: {total.toFixed(2)} zł</div>
      <div>📈 Total Tax: {tax.toFixed(2)} zł</div>
    </SummaryContainer>
  );
};
