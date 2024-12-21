// import S from './DownloadCMYKButton.module.scss';

import { CreateDividerZipOptions } from "@/features/zip/createDividerZip";
import { DownloadZIPButton } from "../DownloadZIPButton/DownloadZIPButton";
import { rgb2cmyk } from "@/features/image/rgb2cmyk";

export type DownloadCMYKButtonProps = {
  mapRenderResponse?: CreateDividerZipOptions['mapRenderResponse']
}

export const DownloadCMYKButton = ({}: DownloadCMYKButtonProps) => {
  return (
    <DownloadZIPButton
      imageFormat={'tiff'}
      mapRenderResponse={rgb2cmyk}
    >
      TIFF
    </DownloadZIPButton>
  );
}