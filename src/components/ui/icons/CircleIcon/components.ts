import { IIconTransform } from "@/shared/model/types/icons";
import styled, { css } from "styled-components";

export const Container = styled.div<{
	$transform: IIconTransform;
	$layoutScale: number;
}>`
  ${({ $transform, $layoutScale }) => {
		const dX = $transform.left || 0;
		const dY = $transform.top || 0;
		const left = $layoutScale * dX;
		const top = $layoutScale * dY;
		const scale = $transform.scale || 1;
		return css`
      transform: scale(${scale}) translateX(${left}%) translateY(${top}%);
    `;
	}}
`;
