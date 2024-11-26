import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getBrowserDPI, PRINT_DPI } from '@/util/units';
import { useMemo, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { selectLayout, setZoom } from '@/store/features/layout/layout';
import { setExport } from '@/store/features/app/app';
import { useAppSelector } from './useAppSelector';
import { selectBleed, setBleed } from '@/store/features/print/print';
import { delay } from '@/util/common';
import { getDividerImage } from '@/features/render/getDividerImage';
import { getSimilarBleed } from '@/features/render/getSimilarBleed';
import { useTranslation } from 'react-i18next';


const getDividerNodes = () => Array.from(
  document.querySelectorAll('.divider')
);

export const useDownloadDividers = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const useBleed = useAppSelector(selectBleed);
  const { bleed } = useAppSelector(selectLayout);
  const similarBleed = getSimilarBleed(bleed);

  const scale = useMemo(() => PRINT_DPI / getBrowserDPI(), []);

  const [progress, setProgress] = useState({
    done: 0,
    total: 0
  });

  let cancelled = false;

  const download = async () => {
    const defaultUseBleed = useBleed;
    dispatch(setZoom(100));
    dispatch(setExport(true));
    dispatch(setBleed(true));

    try {
      await delay(1000);
      await process();
    }
    catch (error) {
      console.error('Error downloading dividers:', error);

      dispatch(setExport(false));
      setProgress({
        done: 0,
        total: 0
      });
    }
    finally {
      dispatch(setBleed(defaultUseBleed));
    }
  }

  const process = async () => {
    if (progress.done !== progress.total) {
      return;
    }

    const nodes = getDividerNodes();
    const total = nodes.length;
    if (nodes.length === 0) {
      return;
    }

    const zip = new JSZip;
    const bleedSize = similarBleed.size;

    setProgress({
      done: 0,
      total
    });

    cancelled = false;

    for (const [key, node] of nodes.entries()) {
      if (cancelled) {
        return;
      }
      const name = key > 9 ? key.toString() : '0' + key;
      const options = {
        name,
        node,
        scale,
        bleed
      };

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
    setProgress({
      done: 0,
      total: 0
    });
    
    const bleedText = bleedSize.toFixed(1);
    const bleedTranslation = t('Bleed').toLowerCase();
    const zipName = `Arkham Divider (${bleedTranslation} ${bleedText}mm).zip`
    saveAs(content, zipName);
  }

  return {
    download,
    progress,
  };
}