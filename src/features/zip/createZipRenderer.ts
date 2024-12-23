import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { DividerNodeRenderer } from '../render/DividerNodeRenderer';
import { ILayoutBleed } from '@/types/layouts';
import { ImageFormat } from '@/types/image';
import { RenderResponseMapper } from '@/types/render';

export type RenderOptions = {
  name: string
  bleed: ILayoutBleed
  imageFormat: ImageFormat
  transformResponse?: RenderResponseMapper
};

export type CreateDividerZipOptions = RenderOptions & {
  name: string
};

export const createZipRenderer = ({
  bleed,
  name,
  imageFormat,
  transformResponse = async f => f
}: CreateDividerZipOptions) => {
  const zip = new JSZip;

  const renderer = new DividerNodeRenderer({
    bleed,
    imageFormat,
    async onDone() {
      const content = await zip.generateAsync({ 
        type: 'blob',
      });

      const zipName = `${name}.zip`;
      saveAs(content, zipName);
    },
    async onRender(event) {
      const { data } = event;
      const { filename } = data;
      const contents = await transformResponse(data.contents);

      zip.file(filename, contents, {
        binary: true,
      });
    }
  });

  return renderer;
}