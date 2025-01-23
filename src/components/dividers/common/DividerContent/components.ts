import { ILayout } from '@/shared/types/layouts';
import styled, { css } from 'styled-components';

type ComponentProps = {
  $layout: ILayout
  $bleed: boolean
}

export const GuidesContent = styled.div<ComponentProps>`
  ${({ $bleed, $layout }) => $bleed && css`
    width: ${$layout.width}mm;
    height: ${$layout.height}mm;
    top: ${$layout.bleed.top}mm;
    left: ${$layout.bleed.left}mm;
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
    width: ${$layout.bleed.width}mm;
    height: ${$layout.bleed.height}mm;
  `}
  ${({ $bleed, $layout }) => !$bleed && css`
    top: -${$layout.bleed.top}mm;
    left: -${$layout.bleed.left}mm;

    width: ${$layout.bleed.width}mm;
    height: ${$layout.bleed.height}mm;
  `}
`