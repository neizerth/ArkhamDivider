import { useAppDispatch } from '@/hooks/useAppDispatch';
// import S from './PrintSettings.module.scss';

import { Checkbox, Row } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { 
  selectBleeds, 
  selectDoubleSided, 
  setBleeds, 
  setDoubleSided,
} from '@/store/features/print/print';
import { useTranslation } from 'react-i18next';
import { LayoutGridSettings } from '../LayoutGridSettings/LayoutGridSettings';

export type PrintSettingsProps = {

}

export const PrintSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const doubleSided = useAppSelector(selectDoubleSided);
  const useBleeds = useAppSelector(selectBleeds);

  const toggleDoubleSided = () => dispatch(setDoubleSided(!doubleSided));
  const toggleBleeds = () => dispatch(setBleeds(!useBleeds));

  // const 
  return (
    <Row>
      <LayoutGridSettings/>
      <Checkbox onChange={toggleDoubleSided} checked={doubleSided}>
        {t('2 sides')}
      </Checkbox>
      <Checkbox 
        onChange={toggleBleeds} 
        checked={useBleeds}
      >
        {t('Bleeds')}
      </Checkbox>
    </Row>
  );
}