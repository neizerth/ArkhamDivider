import { PageOrientation } from "./print"

export type ILayout = {
  id: string,
  width: number
  height: number
  rowSize: number
  groupSize: number
  title: string
  types: LayoutType[]
  orientation: LayoutOrientation
  pageOrientation: PageOrientation
  is_default?: boolean
  color: boolean
}

export enum LayoutType {
  SCENARIO = 'scenario',
  PLAYER = 'player',
  INVESTIGATOR = 'investigator'
}

export enum LayoutOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}
