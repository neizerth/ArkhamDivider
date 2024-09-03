import { IDividerType } from "./dividers"

export type ILayout = {
  id: string,
  width: number
  height: number
  rowSize: number
  groupSize: number
  title: string
  type: IDividerType
  image: string
  is_default?: boolean
  color: boolean
}