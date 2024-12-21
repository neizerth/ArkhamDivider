import { ButtonType } from '@/types/ui';
// import S from './DownloadZIPButton.module.scss';
import { Icon, IconButton } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectExport } from '@/store/features/app/app';
import { useDownloadDividers } from '@/hooks/useDownloadDividers';
import { selectDividers } from '@/store/features/dividers/dividers';
import { PropsWithChildren } from 'react';
import { CreateDividerZipOptions } from '@/features/zip/createDividerZip';
import { ImageFormat } from '@/types/image';

export type DownloadZIPButtonProps = PropsWithChildren & {
  imageFormat: ImageFormat
  mapRenderResponse?: CreateDividerZipOptions['mapRenderResponse']
}

export const DownloadZIPButton = ({ 
  mapRenderResponse,
  imageFormat,
  children 
}: DownloadZIPButtonProps) => {
  const { 
    download,
    progress,
    cancel,
    status
  } = useDownloadDividers({
    imageFormat,
    mapRenderResponse
  });
  const isExport = useAppSelector(selectExport);
  const dividers = useAppSelector(selectDividers);

  const isDone = progress.done === progress.total;
  const isDisabled = dividers.length === 0;

  const onClick = () => {
    if (status === 'working') {
      return cancel();
    }
    download();
  }

  return (
    <IconButton 
      onClick={onClick} 
      buttonType={status === 'working' ? ButtonType.DANGER : ButtonType.SECONDARY}
      icon="download"
      disabled={isDisabled}
    >
      {children} {!isDone && (
        <>{progress.done} / {progress.total}</>
      )}
      {isDone && isExport && <Icon icon="hour-glass"/>}
    </IconButton>
);
}