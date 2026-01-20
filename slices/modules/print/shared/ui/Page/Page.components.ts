import { css } from "@emotion/css";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import type { Side } from "@/shared/model";

export const Page = styled(Box)<{ side: Side }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media print {
    page-break-inside: avoid;
    overflow: visible;
  }
    
  ${({ side }) =>
		side === "front" &&
		css`
    @media screen {
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
      &:hover {
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
      }
    }
  `}
  ${({ side }) =>
		side === "back" &&
		css`
    background-color: #f3f3f3;
    @media screen {
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.1);
    
      &:hover {
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.1);
      }
    }
  `}
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
