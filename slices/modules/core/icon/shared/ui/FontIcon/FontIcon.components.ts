import { injectGlobal } from "@emotion/css";
import { styled } from "@mui/material/styles";
import { ArkhamDividerAPI } from "@/shared/api";

const { fontsUrl } = ArkhamDividerAPI;

injectGlobal`
 @font-face {
    font-family: 'ArkhamIcons';
    src: url(${fontsUrl}/icons.woff) format('woff'),
      url("${fontsUrl}/icons.woff2") format("woff2");
    font-style: normal;
    font-weight: normal !important;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export const Container = styled("span")`
  font-family: ArkhamIcons;
  user-select: none;
  line-height: 1;
`;
