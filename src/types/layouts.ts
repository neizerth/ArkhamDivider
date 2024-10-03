import { AddPlayerDividersOptions, AddStoryDividersOptions } from "@/store/features/addDividers/addDividers"
import { PageOrientation } from "./print"

export type ILayout = {
  id: string,
  categoryId: string,
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
  bleeds: {
    width: number
    height: number
    top: number
    left: number
  }
  campaignOptions?: Partial<AddStoryDividersOptions>,
  playerOptions?: Partial<AddPlayerDividersOptions>
}

export type ILayoutAuthorContact = {
  id: string
  icon: string
  url: string
}

export type ILayoutAuthor = {
  name: string
  image?: string
  contacts?: ILayoutAuthorContact[]
} 

export type ILayoutCategory = {
  id: string
  name: string
  info?: string
  author?: ILayoutAuthor
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

export type ILayoutCriteria = Partial<ILayout> & {
  type?: LayoutType
}