import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.black.normal};
    color: ${(props) => props.theme.white.lighter};
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.2;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
		all: unset;
    cursor: pointer;
	}
  ul, ol, li {
    list-style: none;
    list-style-type: none;
  }
`;
