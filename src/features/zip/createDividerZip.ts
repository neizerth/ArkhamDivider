import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { DividerNodeRenderer, DividerNodeRendererDoneEventData, DividerNodeRendererRenderEventData } from '../render/DividerNodeRenderer';
import { ILayoutBleed } from '@/types/layouts';

type OnRenderEventData = DividerNodeRendererRenderEventData;
type OnDoneEventData = DividerNodeRendererDoneEventData

export const createDividerZip = ({
  bleed,
  name,
  onCancel,
  onRender,
  beforeDone
}: {
  name: string
  bleed: ILayoutBleed
  onCancel: () => void
  beforeDone?: () => void
  onRender?: (event: OnRenderEventData) => void
}) => {
  const zip = new JSZip;

  const renderer = new DividerNodeRenderer({
    bleed,
    onCancel,
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
      const { contents, filename } = event.data;

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