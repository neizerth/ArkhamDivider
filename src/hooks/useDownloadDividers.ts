import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { selectLayout, setZoom } from '@/store/features/layout/layout';
import { selectExport, setExport } from '@/store/features/app/app';
import { useAppSelector } from './useAppSelector';
import { selectBleed, setBleed } from '@/store/features/print/print';
import { useTranslation } from 'react-i18next';
import { DividerNodeRenderer } from '@/features/render/DividerNodeRenderer';
import { Nullable } from '@/types/util';
import { createDividerZip } from '@/features/zip/createDividerZip';
import { getSimilarBleed } from '@/features/render/getSimilarBleed';

type DownloadStatus = 'working' | 'complete' | 'initial' | 'cancelled' | 'error';

export const useDownloadDividers = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const useBleed = useAppSelector(selectBleed);
  const isExport = useAppSelector(selectExport);
  const { bleed } = useAppSelector(selectLayout);
  const [defaultBleed, setDefaultBleed] = useState(useBleed);

  useEffect(() => {
    if (isExport) {
      return;
    }
    setDefaultBleed(useBleed);
  }, [useBleed, isExport]);

  const [progress, setProgress] = useState({
    done: 0,
    total: 0
  });

  const [renderer, setRenderer] = useState<Nullable<DividerNodeRenderer>>(null);
  const [status, setStatus] = useState<DownloadStatus>('initial');

  const cancel = () => {
    console.log('cancelled');
    renderer?.cancel();
  }

  const onCancel = () => {
    console.log('onCancel');
    setStatus('cancelled');
    onFinally();
  }

  const onFinally = () => {
    dispatch(setBleed(defaultBleed));
    dispatch(setExport(false));

    setRenderer(null);
    setProgress({
      done: 0,
      total: 0
    });
  }

  useEffect(() => {
    if (!isExport || renderer) {
      return;
    }
    onStart();
  }, [renderer, isExport])

  const onStart = async () => {
    try {
      await process();
      setStatus('complete');
    }
    catch (error) {
      console.error('Error downloading dividers:', error);
      setStatus('error');
    }
    finally {
      onFinally();
    }
  }

  const download = async () => {
    dispatch(setZoom(100));
    dispatch(setExport(true));
    dispatch(setBleed(true));
    setStatus('working'); 
  }

  const process = async () => {
    if (progress.done !== progress.total) {
      return;
    }
    
    const similarBleed = getSimilarBleed(bleed);

    const bleedText = similarBleed.size.toFixed(1);
    const bleedTranslation = t('Bleed').toLowerCase();
    const name = `Arkham Divider (${bleedTranslation} ${bleedText}mm)`;

    const renderer = createDividerZip({
      name,
      bleed: similarBleed,
      onCancel,
      onRender: setProgress,
      beforeDone: () => dispatch(setExport(false))
    })

    setRenderer(renderer);

    await renderer.run();
  }

  return {
    download,
    progress,
    cancel,
    status
  };
}