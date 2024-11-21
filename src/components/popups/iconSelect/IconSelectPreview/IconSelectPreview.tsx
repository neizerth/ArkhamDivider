import { Upload, Icon, Button } from '@/components';
import S from './IconSelectPreview.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export type IconSelectPreviewProps = {
  defaultIcon?: string
  onChange: (icon: string) => void
}

export const IconSelectPreview = ({
  defaultIcon,
  onChange
}: IconSelectPreviewProps) => {
  const [icon, setIcon] = useState(defaultIcon);

  useEffect(() => {
    const isURL = icon && icon.startsWith('blob:');
    if (icon !== defaultIcon && isURL) {
      URL.revokeObjectURL(icon);
    }
    
    setIcon(defaultIcon);
  }, [defaultIcon])

  const onUpload = ([file]: FileList) => {
    // console.log(file);
    const url = URL.createObjectURL(file);
    setIcon(url);
    onChange(url);
  }
  const { t } = useTranslation();
  return (
    <div>
      <div className={S.icon}>
        {icon && (
          <>
            {icon && <Icon icon={icon}/>}
          </>
        )}
      </div>
      <div 
        className={S.actions}
      >
        <Upload onChange={onUpload} accept="image/*" key={icon}>
          <Button className={S.uploadButton}>
            <Icon icon='upload'/>{t('Upload')}
          </Button>
        </Upload>
      </div>
    </div>
  );
}