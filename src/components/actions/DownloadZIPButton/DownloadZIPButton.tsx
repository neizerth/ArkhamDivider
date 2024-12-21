import { ButtonType } from '@/types/ui';
// import S from './DownloadZIPButton.module.scss';
import { Icon, IconButton } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectExport } from '@/store/features/app/app';
import { useDownloadDividers } from '@/hooks/useDownloadDividers';
import { detect } from 'detect-browser';
import { useCallback, useMemo } from 'react';
import { selectDividers } from '@/store/features/dividers/dividers';

export type DownloadZIPButtonProps = {

}

export const DownloadZIPButton = ({}: DownloadZIPButtonProps) => {
  const { 
    download,
    progress,
    cancel,
    status
  } = useDownloadDividers();
  const isExport = useAppSelector(selectExport);
  const dividers = useAppSelector(selectDividers);

  const isDone = progress.done === progress.total;
  const browser = useMemo(detect, []);
  const isChrome = browser?.name ==='chrome';
  const isDisabled = dividers.length === 0 || !isChrome;

  const onDownload = useCallback(() => {
    if (!isChrome) {
      return;
    }
    download();
  }, []);

  const onClick = () => {
    console.log({status});
    if (status === 'working') {
      return cancel();
    }
    onDownload();
  }

  return (
    <IconButton 
      onClick={onClick} 
      buttonType={status === 'working' ? ButtonType.DANGER : ButtonType.SECONDARY}
      icon="download"
      disabled={isDisabled}
      title={!isChrome ? 'Your browser is not supported' : ''}
    >
      PNG {!isDone && (
        <>{progress.done} / {progress.total}</>
      )}
      {isDone && isExport && <Icon icon="hour-glass"/>}
      {!isChrome && (
        <Icon icon="chrome"/>
      )}
    </IconButton>
);
}