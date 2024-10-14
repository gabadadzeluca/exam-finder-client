import { createGlobalStyle } from "styled-components";
import { COLORS } from "../utils/colors";

export const GlobalStyle = createGlobalStyle` 
  *,
  *::before,
  *::after { 
    margin:0;
    padding: 0;
    box-sizing: border-box;
  } 

  body {
    background-color: ${COLORS.VERY_DARK_BLUE}; 
  } 

  input, select, textarea, button{font-family:inherit;}
`;
