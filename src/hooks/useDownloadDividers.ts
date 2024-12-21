import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { selectLayout, setZoom } from '@/store/features/layout/layout';
import { setExport } from '@/store/features/app/app';
import { useAppSelector } from './useAppSelector';
import { selectBleed, setBleed } from '@/store/features/print/print';
import { useTranslation } from 'react-i18next';
import { DividerNodeRenderer } from '@/features/render/DividerNodeRenderer';
import { Nullable } from '@/types/util';
import { delay } from '@/util/common';


const getDividerNodes = () => Array.from(
  document.querySelectorAll('.divider')
);

export const useDownloadDividers = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const useBleed = useAppSelector(selectBleed);
  const { bleed } = useAppSelector(selectLayout);


  const [progress, setProgress] = useState({
    done: 0,
    total: 0
  });

  const [renderer, setRenderer] = useState<Nullable<DividerNodeRenderer>>(null);

  const cancel = () => {
    renderer?.cancel();
  }

  const download = async () => {
    const defaultUseBleed = useBleed;
    dispatch(setZoom(100));
    dispatch(setExport(true));
    dispatch(setBleed(true));

    try {
      await delay(10);
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
      setRenderer(null);
    }
  }

  const process = async () => {
    if (progress.done !== progress.total) {
      return;
    }

    const zip = new JSZip;

    const renderer = new DividerNodeRenderer({
      bleed,
      onCancel() {
        dispatch(setExport(false));
      },
      async onDone({ bleed }) {
        const content = await zip.generateAsync({ 
          type: 'blob',
        });
        dispatch(setExport(false));

        const bleedText = bleed.size.toFixed(1);
        const bleedTranslation = t('Bleed').toLowerCase();
        const zipName = `Arkham Divider (${bleedTranslation} ${bleedText}mm).zip`
        saveAs(content, zipName);
      },
      onRender({ done, total, data }) {
        const {
          contents,
          filename
        } = data;

        zip.file(filename, contents, {
          binary: true,
        });

        setProgress({
          done,
          total,
        });
      }
    });

    setRenderer(renderer);
    await renderer.run();
  }

  return {
    download,
    progress,
    cancel
  };
}