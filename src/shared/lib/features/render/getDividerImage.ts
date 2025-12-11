import * as htmlToImage from 'html-to-image';
import { ColorScheme, ImageFormat } from '@/shared/types/image';
import { ILayoutBleed } from '@/shared/types/layouts';
import { RenderResponse } from '@/shared/types/render';
import { getVips } from '../image/vips';
import { closeBlob, forceGarbageCollection } from '../memory/memoryUtils';
import { delay } from '../util/common';

export type GetDividerImageOptions = {
  node: HTMLElement;
  scale: number;
  name: string;
  bleed: ILayoutBleed;
  imageFormat: ImageFormat;
  colorScheme?: ColorScheme;
  useBleed: boolean;
};

export const getDividerImage = async ({
  node,
  scale,
  name,
  imageFormat,
  colorScheme,
}: GetDividerImageOptions): Promise<RenderResponse> => {
  const rect = node.getBoundingClientRect();

  const width = rect.width * scale;
  const height = rect.height * scale;

  const blob = await htmlToImage.toBlob(node, {
    width,
    height,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
    },
  });

  if (!blob) {
    throw new Error('Failed to create blob');
  }

  const source = await blob.arrayBuffer();
  const vips = await getVips();
  const memory = vips.Stats.mem() / 1024;

  console.log('used vips memory, Kb', memory);

  let image = vips.Image.newFromBuffer(source);

  if (colorScheme) {
    image = image.iccTransform(colorScheme);
  }

  const ext = `.${imageFormat}`;

  const contents = image.writeToBuffer(ext);

  const filename = name + ext;

  delay(100).then(() => {
    // Clean up VIPS image
    // image.delete();

    // Clean up blob to free memory
    closeBlob(blob);

    // Force garbage collection if available
    forceGarbageCollection();
  });

  return {
    filename,
    contents,
  };
};
