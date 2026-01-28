import { css } from "@emotion/css";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Page = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;

  @media print {
    page-break-after: always;
    overflow: hidden;
  }
  @media screen {
    border-radius: 5px;
  }
`;

export const Counter = styled(Box)<{ rotated?: boolean }>`
  position: absolute;
  text-align: right;
  z-index: 2;
  font-size: 2.2mm;
  line-height: 1;
  top: 1.5mm;
  right: 1.3mm;
  ${({ rotated }) =>
		rotated &&
		css`
    top: -1.6mm;
    right: 0.2mm;
    transform: rotate(-90deg);
    transform-origin: bottom right;
  `}
`;
