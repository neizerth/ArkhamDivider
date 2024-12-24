import { ImageFormat } from "@/types/image";
import { DividerNodeRenderer } from "../render/DividerNodeRenderer";
import { ILayoutBleed } from "@/types/layouts";
import { RenderResponseMapper } from "@/types/render";
import { saveAs } from 'file-saver';

export const createPDFRenderer = ({
  name,
  bleed,
  imageFormat,
  renderBlob,
  transformResponse = async f => f
}: {
  name: string
  bleed: ILayoutBleed
  imageFormat: ImageFormat
  renderBlob: (data: Uint8Array[]) => Promise<Blob>
  transformResponse?: RenderResponseMapper
}) => {
  let items: Uint8Array[] = [];
  const renderer = new DividerNodeRenderer({
    bleed,
    imageFormat,
    async onRender(event) {
      const { data } = event;
      const contents = await transformResponse(data.contents);

      items.push(contents);
    }
  });

  renderer
    .on('start', () => {
      items = [];
    })
    .on('done', async () => {

      const blob = await renderBlob(items);

      saveAs(blob, name);
    });

  return renderer;
}