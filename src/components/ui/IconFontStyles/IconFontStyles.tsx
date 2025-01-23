import { API_URL } from "@/shared/config/app";
import { createGlobalStyle } from "styled-components";

const fontsURL = API_URL + '/fonts'

export const IconFontStyles = createGlobalStyle`
  @font-face {
    font-family: 'ArkhamIcons';
    src: url(${fontsURL}/icons.woff) format('woff'),
      url("${fontsURL}/icons.woff2") format("woff2");
    font-style: normal;
    font-weight: normal !important;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
