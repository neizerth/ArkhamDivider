import { CREDITS_HEIGHT } from "@/components/info/PageCredits/PageCredits";
import { IBox } from "@/shared/types/units";
import styled, { css } from "styled-components";

export const Container = styled.div<{
  $portrait: boolean
  $size: IBox
  $freeHeight: number
  $showCredits: boolean
  $isLast: boolean
}>`
  ${({ $showCredits, $freeHeight, $isLast }) => $isLast && $showCredits && css`
    align-items: start;
    padding-top: ${Math.min($freeHeight - CREDITS_HEIGHT, 10)}mm;
  `}
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