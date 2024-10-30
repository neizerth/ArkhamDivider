import domToImage from 'dom-to-image';
import JSZip from 'jszip';
import { Jimp } from 'jimp';
import { saveAs } from 'file-saver';
import { getBrowserDPI, PRINT_DPI } from '@/util/units';
import { useMemo, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setZoom } from '@/store/features/layout/layout';
import { setExport } from '@/store/features/app/app';
import { detect } from 'detect-browser';

export const getDividerImage = async ({
  node,
  scale,
  name
}: {
  node: Element
  scale: number
  name: string
}) => {
  const rect = node.getBoundingClientRect();
  
  const width = rect.width * scale;
  const height = rect.height * scale;

  const image = await domToImage.toPng(node, {
    width,
    height,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'top left'
    }
  });

  const jimp = await Jimp.read(image);
  const contents = await jimp.getBuffer('image/tiff');
  const filename = name + '.tiff';

  return {
    filename,
    contents
  }
}

const getDividerNodes = () => Array.from(
  document.querySelectorAll('.divider')
);

export const useDownloadDividers = () => {
  const dispatch = useAppDispatch();
  const scale = useMemo(() => PRINT_DPI / getBrowserDPI(), []);
  const browser = useMemo(detect, []);
  const isSafari = browser?.name === 'safari';

  const [progress, setProgress] = useState({
    done: 0,
    total: 0
  });

  let cancelled = false;

  const download = async () => {
    if (progress.done !== progress.total) {
      return;
    }
    dispatch(setZoom(100));
    dispatch(setExport(true));

    const nodes = getDividerNodes();
    const total = nodes.length;
    if (nodes.length === 0) {
      return;
    }

    setProgress({
      done: 0,
      total
    });

    cancelled = false;
    const zip = new JSZip;

    for (const [key, node] of nodes.entries()) {
      if (cancelled) {
        return;
      }
      const name = key > 9 ? key.toString() : '0' + key;
      const options = {
        name,
        node,
        scale
      };

      if (isSafari && key === 0) {
        await getDividerImage(options);
      }
      
      const {
        contents,
        filename
      } = await getDividerImage(options);

      zip.file(filename, contents, {
        binary: true,
      });

      setProgress({
        done: key + 1,
        total,
      });
    }

    const content = await zip.generateAsync({ 
      type: 'blob',
    });
    dispatch(setExport(false));
    saveAs(content, 'Arkham Divider');

  }

  return {
    download,
    progress,
  };
}