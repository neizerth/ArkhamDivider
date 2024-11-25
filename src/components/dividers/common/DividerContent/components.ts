import { ILayout } from '@/types/layouts';
import styled, { css } from 'styled-components';

type ComponentProps = {
  $layout: ILayout
  $bleeds: boolean
}

export const GuidesContent = styled.div<ComponentProps>`
  ${({ $bleeds, $layout }) => $bleeds && css`
    width: calc(${$layout.width}mm + 2px);
    height: calc(${$layout.height}mm + 2px);
    top: calc(${$layout.bleeds.top}mm - 2px);
    left: calc(${$layout.bleeds.left}mm - 2px);
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
  ${({ $layout, $bleeds }) => $bleeds && css`
    width: calc(${$layout.bleeds.width}mm + 2px);
    height: calc(${$layout.bleeds.height}mm + 2px)
  `}
  ${({ $bleeds, $layout }) => !$bleeds && css`
    top: -${$layout.bleeds.top}mm;
    left: -${$layout.bleeds.left}mm;

    width: ${$layout.bleeds.width}mm;
    height: ${$layout.bleeds.height}mm;
  `}
`