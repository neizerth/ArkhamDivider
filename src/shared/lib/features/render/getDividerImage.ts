import domToImage from 'dom-to-image';
import * as htmlToImage from 'html-to-image';
import { toPrintSize } from '@/shared/lib/features/util/units';
import { ColorScheme, ImageFormat } from '@/shared/types/image';
import { ILayoutBleed } from '@/shared/types/layouts';
import { RenderResponse } from '@/shared/types/render';
import { getVips } from '../image/vips';

export type GetDividerImageOptions = {
  node: HTMLElement;
  scale: number;
  name: string;
  bleed: ILayoutBleed;
  imageFormat: ImageFormat;
  colorScheme?: ColorScheme;
};

export const getDividerImage = async ({
  node,
  scale,
  name,
  bleed,
  imageFormat,
  colorScheme,
}: GetDividerImageOptions): Promise<RenderResponse> => {
  const rect = node.getBoundingClientRect();

  const width = rect.width * scale;
  const height = rect.height * scale;

  console.log('downloading blob', node);

  const blob = await htmlToImage.toBlob(node, {
    width,
    height,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
    },
  });

  console.log('blob', blob);

  const cropLeft = toPrintSize(bleed.left);
  const cropTop = toPrintSize(bleed.top);
  const cropWidth = toPrintSize(bleed.width);
  const cropHeight = toPrintSize(bleed.height);

  const source = await blob.arrayBuffer();
  const vips = await getVips();
  const memory = vips.Stats.mem() / 1024;

  console.log('used vips memory, Kb', memory);

  let image = vips.Image.newFromBuffer(source).crop(cropLeft, cropTop, cropWidth, cropHeight);

  if (colorScheme) {
    image = image.iccTransform(colorScheme);
  }

  const ext = `.${imageFormat}`;

  const contents = image.writeToBuffer(ext);

  const filename = name + ext;

  image.delete();

  return {
    filename,
    contents,
  };
};
