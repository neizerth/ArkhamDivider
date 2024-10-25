import { AddPlayerDividersOptions, AddStoryDividersOptions } from "@/store/features/addDividers/addDividers"
import { PageOrientation } from "./print"
import { Mapping } from "./util"

export type ILayout = {
  id: string
  categoryId: string
  width: number
  height: number
  rowSize: number
  groupSize: number
  title: string
  types: LayoutType[]
  orientation: LayoutOrientation
  pageOrientation: PageOrientation
  isDefault?: boolean
  color: boolean
  bleeds: {
    width: number
    height: number
    top: number
    left: number
  },
  maxCreditsGroupSize?: number,
  campaignOptions?: Partial<AddStoryDividersOptions>,
  playerOptions?: Partial<AddPlayerDividersOptions>,
  customParams?: Mapping
}

export type ILayoutAuthorContact = {
  id: string
  icon: string
  url: string
}

export type ILayoutAuthor = {
  name: string
  url: string
  image?: string
  donationUrl?: string
  contacts?: ILayoutAuthorContact[]
} 

export type ILayoutCategory = {
  id: string
  unlisted?: boolean,
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