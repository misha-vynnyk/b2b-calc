import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #2c2c2c;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
`;

export const Thead = styled.thead`
  @media (max-width: 600px) {
    display: none;
  }
`;

export const TBody = styled.tbody``;

export const Th = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 2px solid #555;
  font-weight: bold;
  color: #ccc;
  white-space: nowrap;
  background-color: #1e1e1e;
`;

export const AddButton = styled.button`
  margin-top: 1rem;
  background-color: #4e91fc;
  color: white;
  border: none;
  padding: 0.7rem 1.4rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3571cc;
  }
`;
