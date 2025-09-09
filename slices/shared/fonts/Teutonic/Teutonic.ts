import { injectGlobal } from "@emotion/css";

injectGlobal`
  @font-face {
    font-family: 'Teutonic';
    src: url('./Teutonic.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Teutonic Extended';
    src: url('./TeutonicExtended.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
