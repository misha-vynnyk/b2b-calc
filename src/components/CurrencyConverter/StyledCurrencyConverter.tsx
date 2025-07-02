import type { StylesConfig } from "react-select";
import styled from "styled-components";
import type { CurrencyOption } from "../../contexts/CurrencyContext.types";

const textColor = "#ffffff";

export const customStyles: StylesConfig<CurrencyOption, false> = {
  control: (base, state) => ({
    ...base,
    minWidth: "100px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(12px) saturate(180%)",
    borderColor: state.isFocused ? "rgba(52, 88, 249, 0.5)" : "rgba(255, 255, 255, 0.18)",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(52, 88, 249, 0.3)" : base.boxShadow,
    "&:hover": {
      borderColor: state.isFocused ? "rgba(52, 88, 249, 0.7)" : "rgba(255, 255, 255, 0.25)",
    },
    borderRadius: "16px",
    transition: "all 0.3s ease-in-out",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "rgba(60, 60, 60, 0.2)",
    borderRadius: "10px",
    overflow: "hidden",
    animation: "fadeIn 0.3s ease forwards",
    backdropFilter: "blur(15px) saturate(180%)",
    WebkitBackdropFilter: "blur(15px) saturate(180%)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "white",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",

    ...(state.isFocused && {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      color: "white",
      textShadow: "0 0 5px rgba(255, 255, 255, 0.7)",
      boxShadow: "inset 0 0 0 1px rgba(52, 88, 249, 0.5)",
      borderLeft: "4px solid rgba(52, 88, 249, 0.7)",
      paddingLeft: `calc(${base.paddingLeft} - 4px)`,
    }),

    ...(state.isSelected && {
      backgroundColor: "rgba(52, 88, 249, 0.2)",
      color: "white",
      fontWeight: "bold",
    }),

    padding: "10px 15px",

    "&:focus": {
      outline: "none",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#999",
  }),
  input: (base) => ({
    ...base,
    color: "white",
  }),
};

export const MainWrapper = styled.div`
  position: relative;
  border-radius: 16px;
  transition: all 0.3s ease-in-out;
  border: 2px solid rgba(255, 253, 253, 0.2);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);

  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 0 0 rgba(52, 88, 249, 0);

  /* backdrop-filter: url(#liquidGlassDistortion) brightness(1.1); */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: 16px;
    transition: all 0.3s ease-in-out;

    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.05) 100%
    );

    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 0.15) 100%
      ),
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 0.05) 100%
      );

    background-size: 100% 100%, 100% 100%;
    background-position: 0 0, 0 0;

    background-blend-mode: overlay;

    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover,
  &:focus-within {
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 25px 8px rgba(52, 88, 249, 0.7);
    transform: translateY(-2px);

    &::before {
      transition: all 0.3s ease-in-out;
      opacity: 1;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 0.15) 100%
      );
    }
  }

  @media (max-width: 425px) {
    backdrop-filter: blur(10px) saturate(150%);
    -webkit-backdrop-filter: blur(10px) saturate(150%);

    &:hover,
    &:focus-within {
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
      transform: translateY(0);
      &::before {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.15) 0%,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.05) 100%
        );
      }
    }
  }
`;

export const GlassBackground = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 16px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(88, 88, 88, 0.2);

  @media (max-width: 425px) {
    padding: 1rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const TwoInputsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0 0;
`;

export const CurrencyTitle = styled.h2`
  text-align: center;
  color: ${textColor};
  font-size: 1rem;
`;

export const Label = styled.label`
  position: absolute;
  color: ${textColor};
  top: 30%;
  left: 10px;
  transition: 0.2s ease all;
`;

export const Input = styled.input`
  margin-top: 0.3rem;
  padding: 0.6rem;
  font-size: 1rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  box-shadow: 0 0 0 2px #4f9eff40;
  color: ${textColor};
  border: 1px solid #666;
  border-radius: 16px;

  &:focus {
    border: 1px solid #4f9eff;
    outline: none;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 0;
    font-size: 12px;
    transform: translateY(-100%);
  }
`;

export const Result = styled.div`
  color: ${textColor};
  margin-top: 1.5rem;
  font-weight: bold;
`;

export const SendButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 14px 24px;
  color: ${textColor};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.25), 0 4px 16px rgba(103, 67, 255, 0.25),
    0 0 0 0.5px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.3), 0 6px 24px rgba(103, 67, 255, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0 3px 12px rgba(103, 67, 255, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  }
`;

export const FloatingLabelTo = styled.label<{ $isActive?: boolean }>`
  position: absolute;
  left: 12px;
  top: ${({ $isActive }) => ($isActive ? "-10%" : "50%")};
  transform: ${({ $isActive }) => ($isActive ? "translateY(-100%)" : "translateY(-50%)")};
  font-size: ${({ $isActive }) => ($isActive ? "12px" : "16px")};
  color: ${textColor};
  padding: 0 4px;
  transition: all 0.3s ease;
  pointer-events: none;
  user-select: none;
  z-index: 10;
`;

export const FloatingLabelFrom = styled.label<{ $isActive?: boolean }>`
  position: absolute;
  left: 12px;
  top: ${({ $isActive }) => ($isActive ? "-10%" : "50%")};
  transform: ${({ $isActive }) => ($isActive ? "translateY(-100%)" : "translateY(-50%)")};
  font-size: ${({ $isActive }) => ($isActive ? "12px" : "16px")};
  color: ${textColor};
  padding: 0 4px;
  transition: all 0.3s ease;
  pointer-events: none;
  user-select: none;
  z-index: 10;
`;
