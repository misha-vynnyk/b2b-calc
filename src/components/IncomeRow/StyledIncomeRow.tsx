import styled from "styled-components";

// === Base styles ===
export const Tr = styled.tr`
  @media (max-width: 600px) {
    display: block;
    margin: 16px;
    border: 1px solid #333;
    border-radius: 6px;
    padding: 8px;
    background-color: #1e1e1e;
  }
`;

export const Td = styled.td`
  border-bottom: 1px solid #444;
  padding: 8px;

  @media (max-width: 600px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 10px;
    font-size: 14px;

    &::before {
      content: attr(data-label);
      font-weight: bold;
      margin-right: 8px;
    }
  }
`;


export const StyledSelect = styled.select`
  width: 100%;
  min-width: 70px;
  padding: 4px;
  font-size: 12px;
  border-radius: 4px;
  background-color: #1e1e1e;
  color: #f0f0f0;
  border: 1px solid #555;

  @media (max-width: 600px) {
    font-size: 11px;
    padding: 2px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  min-width: 30px;
  padding: 4px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #1e1e1e;
  color: #f0f0f0;

  @media (max-width: 600px) {
    font-size: 11px;
    padding: 2px;
  }
`;

export const DateInput = styled.input`
  width: 100%;
  min-width: 0;
  font-size: 12px;
  padding: 4px;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #1e1e1e;
  color: #f0f0f0;
  flex-shrink: 1;
  appearance: none;


  @media (max-width: 600px) {
    font-size: 10px;
    padding: 2px;
  }
`;


export const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #93291d;
  }

  @media (max-width: 600px) {
    padding: 8px 12px;
    font-size: 10px;
  }
`;

export const ButtonContainer = styled.td`
  text-align: center;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;
