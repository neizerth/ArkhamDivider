import styled, { css } from 'styled-components';

type ContainerProps = {
  $height?: number
}

type ZoomProps = {
  $zoom: number
}

export const Container = styled.div<ContainerProps>`
  ${({ $height }) => $height && css`
    min-height: ${$height + 20}px;
  `}
  overflow-x: auto;
  padding: 20px 0;
  @media print {
    padding: 0;
    min-height: auto;
  }
`

export const Area = styled.div<ZoomProps>`
  ${({ $zoom }) => css`
    transform-origin: top left;
    transform: scale(${$zoom / 100});
  `}
  @media print {
    transform: none;
  }
`;