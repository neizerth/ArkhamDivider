import { ILayoutBleeds } from '@/types/layouts';
import { toPrintSize } from '@/util/units';
import domToImage from 'dom-to-image';
import Vips from "wasm-vips";
import { getSimilarBleeds } from './getSimilarBleeds';

export type IGetDividerImageOptions = {
  node: Element
  scale: number
  name: string
  bleeds: ILayoutBleeds
  vips: typeof Vips
}

export const getDividerImage = async ({
  node,
  scale,
  name,
  vips,
  bleeds
}: IGetDividerImageOptions) => {
  const rect = node.getBoundingClientRect();
  
  const width = rect.width * scale;
  const height = rect.height * scale;

  const blob = await domToImage.toBlob(node, {
    width,
    height,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'top left'
    }
  });

  const fileFormat = 'tiff';
  const ext = '.' + fileFormat;
  const type = 'image/' + fileFormat;
  const crop = getSimilarBleeds(bleeds);

  const cropLeft = toPrintSize(crop.left);
  const cropTop = toPrintSize(crop.top);
  const cropWidth = toPrintSize(crop.width);
  const cropHeight = toPrintSize(crop.height);

  const source = await blob.arrayBuffer();
  const buffer = vips.Image.newFromBuffer(source)
    .crop(
      cropLeft,
      cropTop,
      cropWidth,
      cropHeight
    )
    .iccTransform('cmyk')
    .writeToBuffer(ext);

  const blobOptions = { type };
  
  const contents = new Blob([buffer], blobOptions);
  const filename = name + ext;

  return {
    filename,
    contents
  }
}
