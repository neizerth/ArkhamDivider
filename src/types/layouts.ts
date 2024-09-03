import { DividerType } from "./dividers"
import { PageOrientation } from "./print"

export type ILayout = {
  id: string,
  width: number
  height: number
  rowSize: number
  groupSize: number
  title: string
  type: DividerType
  image: string
  orientation: PageOrientation,
  is_default?: boolean
  color: boolean
}