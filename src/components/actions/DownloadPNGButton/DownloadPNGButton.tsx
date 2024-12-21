import { DownloadZIPButton } from '../DownloadZIPButton/DownloadZIPButton';
// import S from './DownloadPNGButton.module.scss';

export type DownloadPNGButtonProps = {

}

export const DownloadPNGButton = ({}: DownloadPNGButtonProps) => {
  return (
    <DownloadZIPButton
      imageFormat={'png'}
    >
      PNG
    </DownloadZIPButton>
  );
}