import { useEffect, useState } from 'react';
import { DividerNodeRenderer } from '@/shared/lib/features/render/DividerNodeRenderer';
import { delay } from '@/shared/lib/features/util/common';
import { selectExport, setExport } from '@/shared/store/features/app/app';
import { setZoom } from '@/shared/store/features/layout/layout';
import { selectBleed, setBleed } from '@/shared/store/features/print/print';
import { OnRenderEventData } from '@/shared/types/render';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

type DownloadStatus = 'working' | 'complete' | 'initial' | 'cancelled' | 'error' | 'ready';

export const useDownloadDividers = ({ renderer }: { renderer: DividerNodeRenderer }) => {
  const dispatch = useAppDispatch();
  const useBleed = useAppSelector(selectBleed);
  const isExport = useAppSelector(selectExport);
  const [defaultBleed, setDefaultBleed] = useState(useBleed);

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

  const onCancel = async () => {
    console.log('onCancel');
    setStatus('cancelled');
    onFinally();
  };

  const onFinally = () => {
    dispatch(setBleed(defaultBleed));
    dispatch(setExport(false));

    setProgress({
      done: 0,
      total: 0,
    });
  };

  const onStart = async () => {
    console.log('started');
    try {
      await delay(100);
      await process();
      setStatus('complete');
    } catch (error) {
      console.error('Error downloading dividers:', error);
      setStatus('error');
    } finally {
      onFinally();
    }
  };

  useEffect(() => {
    if (isExport && status === 'ready') {
      onStart();
    }
  }, [isExport, status, onStart]);

  const onRender = ({ done, total }: OnRenderEventData) => {
    setProgress({ done, total });
  };

  const onDone = () => {
    dispatch(setExport(false));

    renderer.off('render', onRender).off('done', onDone).off('cancel', onCancel);
  };

  const download = async () => {
    dispatch(setZoom(100));
    dispatch(setExport(true));
    dispatch(setBleed(true));
    setStatus('ready');
  };

  const process = async () => {
    if (progress.done !== progress.total) {
      return;
    }

    setStatus('working');

    renderer.on('render', onRender).on('done', onDone).on('cancel', onCancel);

    await renderer.run();
  };

  return {
    download,
    progress,
    cancel,
    status,
  };
};
