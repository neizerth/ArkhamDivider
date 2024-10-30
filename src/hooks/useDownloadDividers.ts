import domToImage from 'dom-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getBrowserDPI, PRINT_DPI } from '@/util/units';
import { useMemo, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setZoom } from '@/store/features/layout/layout';
import { setExport } from '@/store/features/app/app';

export const getDividerImage = async ({
  node,
  scale
}: {
  node: Element
  scale: number
}) => {
  const rect = node.getBoundingClientRect();
  
  const width = rect.width * scale;
  const height = rect.height * scale;

  const image = await domToImage.toBlob(node, {
    width,
    height,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'top left'
    }
  });

  return image;
}

const getDividerNodes = () => Array.from(
  document.querySelectorAll('.divider')
);

export const useDownloadDividers = () => {
  const dispatch = useAppDispatch();
  const scale = useMemo(() => PRINT_DPI / getBrowserDPI(), []);

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
      const contents = await getDividerImage({
        node,
        scale
      });

      const index = key > 9 ? key : '0' + key;
      const filename = `${index}.png`;

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