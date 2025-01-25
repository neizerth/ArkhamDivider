import { DEFAULT_CORNER_RADIUS } from "@/shared/config/print";
import { ILayout } from "@/shared/types/layouts";
import styled, { css } from "styled-components";

export const Container = styled.div<{
	$layout: ILayout;
}>`
  position: absolute;
  border-width: 1px;
  border-style: dashed;
  border-radius: ${DEFAULT_CORNER_RADIUS}mm;
  pointer-events: none;

  ${({ $layout }) => css`
    left: calc(${$layout.bleed.left}mm - 1px);
    top: calc(${$layout.bleed.top}mm - 1px);
    right: calc(${$layout.bleed.right}mm - 1px);
    bottom: calc(${$layout.bleed.bottom}mm - 1px);
  `}
`;
