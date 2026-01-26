import { injectGlobal } from "@emotion/css";

injectGlobal`
  @font-face {
    font-family: 'Conkordia';
    src: url('/fonts/Conkordia/Conkordia.woff2') format('woff2'), 
        url('/fonts/Conkordia/Conkordia.svg') format('svg');
    font-weight: normal;
    font-style: normal;
  }
`;
