import { IBox } from "@/types/units";
import styled, { css } from "styled-components";

export const Container = styled.div<{
  $portrait: boolean
  $size: IBox
}>`
  ${({ $portrait, $size }) => $portrait && css`
    width: ${$size.width}mm;
    height: ${$size.height}mm;

    @media print {
      max-height: ${$size.height}mm;
    }
  `}
  ${({ $portrait, $size }) => !$portrait && css`
    width: ${$size.height}mm;
    height: ${$size.width}mm;
    @media print {
      max-height: ${$size.width}mm;
    }
  `}
  @media print {
    width: auto;
  }
`