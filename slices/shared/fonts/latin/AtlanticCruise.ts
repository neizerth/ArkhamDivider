import { injectGlobal } from "@emotion/css";

injectGlobal`
  @font-face {
    font-family: 'Atlantic Cruise';
    src: url('/fonts/AtlanticCruise/AtlanticCruise.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Atlantic Cruise Extended';
    src: url('/fonts/AtlanticCruise/AtlanticCruiseExtended.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Atlantic Cruise Digits';
    src: url('/fonts/AtlanticCruise/AtlanticCruiseExtended.ttf') format('truetype');
    unicode-range: U+2150-218F;
    font-weight: normal;
    font-style: normal;
  }
`;
