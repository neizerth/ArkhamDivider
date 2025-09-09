import { injectGlobal } from "@emotion/css";

injectGlobal`
  @font-face {
    font-family: 'Arno Pro';
    src: local("ArnoPro"), 
        url('./ArnoPro-Caption.woff2') format('woff'), 
        url('./ArnoPro-Caption.woff') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Arno Pro';
    src: local("ArnoPro-Bold"), 
        url('./ArnoPro-Bold.woff2') format('woff'), 
        url('./ArnoPro-Bold.woff') format('woff2');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Arno Pro';
    src: local("ArnoPro-BoldItalic"), 
        url('./ArnoPro-BoldItalic.woff2') format('woff'), 
        url('./ArnoPro-BoldItalic.woff') format('woff2');
    font-weight: bold;
    font-style: italic;
  }
`;
