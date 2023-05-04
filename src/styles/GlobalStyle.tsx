import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.black.normal};
    color: ${(props) => props.theme.white.normal};
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.2;
    height: 150vh;
    background-color: white;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
