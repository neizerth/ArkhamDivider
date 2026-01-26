import { injectGlobal } from "@emotion/css";

injectGlobal`
  @font-face {
    font-family: 'SanCn';
    src: url('/fonts/SanCn/SanCnM.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'SanCn';
    src: url('/fonts/SanCn/SanCnB.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }
`;
