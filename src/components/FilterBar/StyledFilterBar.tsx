import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  select {
    background-color: #2c2c2c;
    color: #eee;
    border: 1px solid #555;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    min-width: 150px;
    cursor: pointer;
    transition: border-color 0.3s;

    @media (max-width: 600px) {
      padding: 0.2rem 0.5rem;
      font-size: 0%.5rem;
      min-width: 100px;
    }

    &:focus {
      outline: none;
      border-color: #4e91fc;
    }
  }
`;