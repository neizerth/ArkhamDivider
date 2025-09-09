import { injectGlobal } from "@emotion/css";

injectGlobal`
  @font-face {
    font-family: 'Conkordia';
    src: url('./Conkordia.woff2') format('woff2'), 
        url('./Conkordia.svg') format('svg');
    font-weight: normal;
    font-style: normal;
  }
`;
