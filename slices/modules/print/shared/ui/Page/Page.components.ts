import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Page = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin: 0;

  @media print {
    page-break-after: always;
    overflow: hidden;
  }
  @media screen {
    border-radius: 5px;
  }
`;

export const Counter = styled(Box)`
  position: absolute;
  text-align: right;
  z-index: 2;
  line-height: 1;
  @media print {
    font-size: 2.2mm;
    top: 1.5mm;
    right: 1.3mm;
  }
`;
