import { injectGlobal } from "@emotion/css";

injectGlobal`
  @font-face {
    font-family: 'Alegreya';
    src: url('./Alegreya-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Alegreya';
    src: url('./Alegreya-Italic.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
  }
`;
