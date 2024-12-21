import { DividerNodeRenderer } from '../render/DividerNodeRenderer';
import { RenderOptions } from '@/types/render';

export type CreateDividerZipOptions = RenderOptions & {
  name: string
};

export const createDividerZip = ({
  bleed,
  imageFormat,
  onCancel,
  onRender,
  beforeDone,
  mapRenderResponse = async f => f
}: CreateDividerZipOptions) => {
  const renders: Uint8Array[] = [] 

  const renderer = new DividerNodeRenderer({
    bleed,
    onCancel,
    imageFormat,
    async onDone() {
      return renders;
    },
    async onRender(event) {
      const { data } = event;
      const { filename } = data;
      const contents = await mapRenderResponse(data.contents);

      renders.push(contents);
      if (onRender) {
        await onRender(event);
      }
    }
  });

  return renderer;
}