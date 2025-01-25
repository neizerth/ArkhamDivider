import styled, { css } from "styled-components";

type ContainerProps = {
	$height?: number;
};

type ZoomProps = {
	$zoom: number;
};

export const Container = styled.div<ContainerProps>`
  ${({ $height }) =>
		$height &&
		css`
    min-height: ${$height + 20}px;
  `}
  overflow-x: auto;
  padding: 20px 0;
  transform: translate3d(0, 0, 0);
  @media print {
    padding: 0;
    min-height: auto;
  }
`;

export const Area = styled.div<ZoomProps>`
  ${({ $zoom }) => css`
    filter: blur(0);
    transform-origin: top left;
    transform: translate3d(0, 0, 0) scale(${$zoom / 100});
    image-rendering: crisp-edges;
    backface-visibility: hidden;
  `}
  @media print {
    transform: none;
  }
`;
