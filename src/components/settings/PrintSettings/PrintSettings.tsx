import { useAppDispatch } from '@/hooks/useAppDispatch';
import S from './PrintSettings.module.scss';

import { Checkbox, Row } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { 
  selectBleed, 
  selectDoubleSided, 
  setBleed, 
  setDoubleSided,
} from '@/store/features/print/print';
import { useTranslation } from 'react-i18next';

export type PrintSettingsProps = {

}

export const PrintSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const doubleSided = useAppSelector(selectDoubleSided);
  const useBleed = useAppSelector(selectBleed);

  const toggleDoubleSided = () => dispatch(setDoubleSided(!doubleSided));
  const toggleBleed = () => dispatch(setBleed(!useBleed));


  // const 
  return (
    <Row gap={'responsive'}>
      <Checkbox 
        onChange={toggleDoubleSided} 
        checked={doubleSided}

        labelClassName={S.label}
      >
        {t('2 sides')}
      </Checkbox>
      <Checkbox 
        onChange={toggleBleed} 
        checked={useBleed}
        labelClassName={S.label}
      >
        {t('Bleed')}
      </Checkbox>
    </Row>
  );
}