import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { DividerNodeRenderer, DividerNodeRendererRenderEventData } from '../render/DividerNodeRenderer';
import { ILayoutBleed } from '@/types/layouts';
import { ImageFormat } from '@/types/image';

type OnRenderEventData = DividerNodeRendererRenderEventData;

export type CreateDividerZipOptions = {
  name: string
  bleed: ILayoutBleed
  imageFormat: ImageFormat
  mapRenderResponse?: <T extends Uint8Array>(buffer: T) => T
  onCancel: () => void
  beforeDone?: () => void
  onRender?: (event: OnRenderEventData) => void
};

export const createDividerZip = ({
  bleed,
  name,
  imageFormat,
  onCancel,
  onRender,
  beforeDone,
  mapRenderResponse = f => f
}: CreateDividerZipOptions) => {
  const zip = new JSZip;

  const renderer = new DividerNodeRenderer({
    bleed,
    onCancel,
    imageFormat,
    async onDone() {
      const content = await zip.generateAsync({ 
        type: 'blob',
      });

      if (beforeDone) {
        beforeDone();
      }

      const zipName = `${name}.zip`;
      saveAs(content, zipName);
    },
    onRender(event) {
      const { data } = event;
      const { filename } = data;
      const contents = mapRenderResponse(data.contents);

      zip.file(filename, contents, {
        binary: true,
      });

      if (onRender) {
        onRender(event);
      }
    }
  });

  return renderer;
}