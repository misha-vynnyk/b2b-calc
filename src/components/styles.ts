import styled, { createGlobalStyle } from "styled-components";

export const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #000000;
  color: #eee;
  margin: 0;
  padding: 2rem;

  @media (max-width: 600px) {
    padding: 0;
  }
`;

export const GlobalStyle = createGlobalStyle`
body{
  background-color: #121212;

}
  input, select {
    background-color: #222;
    color: #eee;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 0.3rem 0.5rem;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  align-items: center;

  max-width: 1280px;
  border-radius: 16px;
  background-color: #1e1e1e;
  box-shadow: 0 6px 20px rgba(151, 151, 151, 0.4);
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  color: #f0f0f0;

  background-image: url("./public/main-bg.jpg");
  /* background-image: url("./public/main-bg-dark.png"); */
  /* background-image: url("./public/a-light-theme-bg.jpeg"); */
  background-position: center;
  background-size: cover;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;

  @media (max-width: 425px) {
    font-size: 1.5rem;
  }
`;
