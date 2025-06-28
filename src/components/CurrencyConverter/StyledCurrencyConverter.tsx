import styled from "styled-components";

const textColor = "#ffffff";

export const MainWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease-in-out;
  backdrop-filter: url(#liquidGlassFilter) brightness(1.1);
`;

export const BlurWrapper = styled.div`
  background: rgba(255, 255, 255, 0.326);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.12);

  background: rgba(0, 0, 0, 0.4);

  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.2);
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const FromToContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px 0 0;
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
