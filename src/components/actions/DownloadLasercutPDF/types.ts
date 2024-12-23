import { ILayout } from "@/types/layouts"
import { PageOrientation, PageSizeType } from "@/types/print"

export type RenderPDFOptions = {
  layout: ILayout
  pageOrientation: PageOrientation
  pageSizeType: PageSizeType
  data: Uint8Array[]
}