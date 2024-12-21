import { DividerNodeRenderer } from "@/features/render/DividerNodeRenderer";
import { ImageFormat } from "./image";
import { ILayoutBleed } from "./layouts";

export type RenderOptions = {
  name: string
  bleed: ILayoutBleed
  imageFormat: ImageFormat
  mapRenderResponse?: RenderResponseMapper
  onDone?: () => Promise<void>
  onCancel?: () => Promise<void>
  beforeDone?: () => Promise<void>
  onRender?: (event: OnRenderEventData) => Promise<void>
};

export type RenderResponse = {
  filename: string
  contents: Uint8Array
}

export type OnRenderEventData = {
  data: RenderResponse
  total: number
  done: number
}

export type OnRenderCancelEventData = {
  total: number
  done: number
}

export type OnRenderDoneEventData = {
  total: number
}

export type RenderResponseMapper = (buffer: Uint8Array) => Promise<Uint8Array>

export type CreateRendererFunction = (options: RenderOptions) => DividerNodeRenderer