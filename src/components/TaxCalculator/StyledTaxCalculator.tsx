import styled from "styled-components";

const textColor = "#000000"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 3rem;
  padding: 1.5rem;
  color: ${textColor};

  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.3s ease-in-out;

  /* backdrop-filter: url(#liquidGlassFilter) brightness(1.1); */
`;

export const Title = styled.h2`
  align-self: center;
  font-size: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-top: 1rem;
`;

export const Input = styled.input`
  margin-top: 0.3rem;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  background-color: #2c2c2c;
  color: white;
  border: 1px solid #444;
  border-radius: 6px;
`;

export const RadioGroup = styled.div`
  align-self: center;
  margin-top: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }
`;

export const Result = styled.div`
  margin-top: 1.5rem;
  font-weight: bold;
`;

export const ResultContainer = styled.div`
  width: 100%;
`;
