import { ILayout } from '@/types/layouts';
import styled, { css } from 'styled-components';

type ComponentProps = {
  $layout: ILayout
  $bleeds: boolean
}

export const GuidesContent = styled.div<ComponentProps>`
  ${({ $bleeds, $layout }) => $bleeds && css`
    width: ${$layout.width}mm;
    height: ${$layout.height}mm;
    top: ${$layout.bleeds.top}mm;
    left: ${$layout.bleeds.left}mm;
  `}
  ${({ $bleeds }) => !$bleeds && css`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  `}
`

export const Wrapper = styled.div<ComponentProps>`
  ${({ $bleeds, $layout }) => !$bleeds && css`
    width: ${$layout.width}mm;
    height: ${$layout.height}mm;
    overflow: hidden;
  `}
`

export const Content = styled.div<ComponentProps>`
  ${({ $layout }) => css`
    aspect-ratio: ${$layout.bleeds.width} / ${$layout.bleeds.height};
    width: ${$layout.bleeds.width}mm;
  `}
  ${({ $bleeds, $layout }) => !$bleeds && css`
    top: -${$layout.bleeds.top}mm;
    left: -${$layout.bleeds.left}mm;
  `}
`