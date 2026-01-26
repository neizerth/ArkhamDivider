import { injectGlobal } from "@emotion/css";

injectGlobal`
  @font-face {
    font-family: 'Arno Pro';
    src: local("ArnoPro"), 
        url('/fonts/ArnoPro/ArnoPro-Caption.woff2') format('woff'), 
        url('/fonts/ArnoPro/ArnoPro-Caption.woff') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Arno Pro';
    src: local("ArnoPro-Bold"), 
        url('/fonts/ArnoPro/ArnoPro-Bold.woff2') format('woff'), 
        url('/fonts/ArnoPro/ArnoPro-Bold.woff') format('woff2');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Arno Pro';
    src: local("ArnoPro-BoldItalic"), 
        url('/fonts/ArnoPro/ArnoPro-BoldItalic.woff2') format('woff'), 
        url('/fonts/ArnoPro/ArnoPro-BoldItalic.woff') format('woff2');
    font-weight: bold;
    font-style: italic;
  }
`;
