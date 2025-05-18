import styled from "styled-components";

export const Container = styled.div`
  max-width: 960px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 16px;
  background-color: #1e1e1e;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  font-family: "Segoe UI", sans-serif;
  color: #f0f0f0;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h2`
  text-align: center;
  color: #ffffff;
  margin-bottom: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #2c2c2c;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Th = styled.th`
  background: #3a3a3a;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #ffffff;
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #444;

  input,
  select {
    width: 100%;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #555;
    background-color: #1e1e1e;
    color: #f0f0f0;
    font-size: 14px;
  }
`;

export const Button = styled.button`
  margin-right: 1rem;
  margin-top: 1rem;
  padding: 10px 16px;
  font-size: 14px;
  background-color: #4e91fc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3571cc;
  }

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

export const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

export const Summary = styled.div`
  margin-top: 2rem;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
