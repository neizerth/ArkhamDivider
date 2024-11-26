import { ILayout } from '@/types/layouts';
import styled, { css } from 'styled-components';

type ComponentProps = {
  $layout: ILayout
  $bleed: boolean
}

export const GuidesContent = styled.div<ComponentProps>`
  ${({ $bleed, $layout }) => $bleed && css`
    width: calc(${$layout.width}mm + 2px);
    height: calc(${$layout.height}mm + 2px);
    top: calc(${$layout.bleed.top}mm - 2px);
    left: calc(${$layout.bleed.left}mm - 2px);
  `}
  ${({ $bleed }) => !$bleed && css`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  `}
`

export const Wrapper = styled.div<ComponentProps>`
  ${({ $bleed, $layout }) => !$bleed && css`
    width: ${$layout.width}mm;
    height: ${$layout.height}mm;
    overflow: hidden;
  `}
`

export const Content = styled.div<ComponentProps>`
  ${({ $layout, $bleed }) => $bleed && css`
    width: calc(${$layout.bleed.width}mm + 2px);
    height: calc(${$layout.bleed.height}mm + 2px)
  `}
  ${({ $bleed, $layout }) => !$bleed && css`
    top: -${$layout.bleed.top}mm;
    left: -${$layout.bleed.left}mm;

    width: ${$layout.bleed.width}mm;
    height: ${$layout.bleed.height}mm;
  `}
`