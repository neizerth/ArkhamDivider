import { ButtonType } from '@/types/ui';
// import S from './DownloadZIPButton.module.scss';
import { Icon, IconButton } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectExport } from '@/store/features/app/app';
import { useDownloadDividers } from '@/hooks/useDownloadDividers';
import { selectDividers } from '@/store/features/dividers/dividers';
import { PropsWithChildren } from 'react';
import { DividerNodeRenderer } from '@/features/render/DividerNodeRenderer';

export type DownloadZIPButtonProps = PropsWithChildren & {
  renderer: DividerNodeRenderer
}

export const DownloadZIPButton = ({
  renderer,
  children 
}: DownloadZIPButtonProps) => {
  
  const { 
    download,
    progress,
    cancel,
    status
  } = useDownloadDividers({
    renderer
  });
  
  const isExport = useAppSelector(selectExport);
  const dividers = useAppSelector(selectDividers);

  const isDone = progress.done === progress.total;
  const isDisabled = dividers.length === 0;
  const isWorking = status === 'working';

  const onClick = () => {
    if (isExport && !isWorking) {
      return;
    }
    if (isWorking) {
      return cancel();
    }
    download();
  }

  return (
    <IconButton 
      onClick={onClick} 
      buttonType={isWorking ? ButtonType.DANGER : ButtonType.SECONDARY}
      icon="download"
      disabled={isDisabled}
    >
      {children} {isWorking && !isDone && (
        <>{progress.done} / {progress.total}</>
      )}
      {isWorking && isExport && <Icon icon="hour-glass"/>}
    </IconButton>
);
}