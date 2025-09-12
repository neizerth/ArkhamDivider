import { useCallback, useEffect, useState } from 'react';
import { DividerNodeRenderer } from '@/shared/lib/features/render/DividerNodeRenderer';
import { delay } from '@/shared/lib/features/util/common';
import { selectExport, setExport } from '@/shared/store/features/app/app';
import { setZoom } from '@/shared/store/features/layout/layout';
import { selectBleed } from '@/shared/store/features/print/print';
import { OnRenderEventData } from '@/shared/types/render';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

type DownloadStatus = 'working' | 'complete' | 'initial' | 'cancelled' | 'error' | 'ready';

export const useDownloadDividers = ({ renderer }: { renderer: DividerNodeRenderer }) => {
  const dispatch = useAppDispatch();
  const useBleed = useAppSelector(selectBleed);
  const isExport = useAppSelector(selectExport);
  const [_defaultBleed, setDefaultBleed] = useState(useBleed);

  useEffect(() => {
    if (isExport) {
      return;
    }
    setDefaultBleed(useBleed);
  }, [useBleed, isExport]);

  const [progress, setProgress] = useState({
    done: 0,
    total: 0,
  });

  const [status, setStatus] = useState<DownloadStatus>('initial');

  const cancel = async () => {
    console.log('cancelled');
    renderer.cancel();
  };

  const onFinally = useCallback(() => {
    dispatch(setExport(false));

    setProgress({
      done: 0,
      total: 0,
    });
  }, [dispatch]);

  const onCancel = useCallback(async () => {
    console.log('onCancel');
    setStatus('cancelled');
    onFinally();
  }, [onFinally]);

  const onRender = useCallback(({ done, total }: OnRenderEventData) => {
    setProgress({ done, total });
  }, []);

  const onDone = useCallback(() => {
    dispatch(setExport(false));

    renderer.off('render', onRender).off('done', onDone).off('cancel', onCancel);
  }, [dispatch, renderer, onRender, onCancel]);

  const process = useCallback(async () => {
    if (progress.done !== progress.total) {
      return;
    }

    setStatus('working');

    renderer.on('render', onRender).on('done', onDone).on('cancel', onCancel);

    await renderer.run({
      bleed: useBleed,
    });
  }, [progress.done, progress.total, renderer, onRender, onDone, onCancel, useBleed]);

  const onStart = useCallback(async () => {
    console.log('started');
    try {
      await delay(100);
      await process();
      setStatus('complete');
    } catch (error) {
      console.error('Error downloading dividers:');
      console.error(error);

      setStatus('error');
    } finally {
      onFinally();
    }
  }, [onFinally, process]);

  useEffect(() => {
    if (isExport && status === 'ready') {
      onStart();
    }
  }, [isExport, status, onStart]);

  const download = async () => {
    dispatch(setZoom(100));
    dispatch(setExport(true));
    setStatus('ready');
  };

  return {
    download,
    progress,
    cancel,
    status,
  };
};
