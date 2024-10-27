import { useAppDispatch } from '@/hooks/useAppDispatch';

import { Checkbox, Icon, Row } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { 
  selectBleeds, 
  selectDoubleSided, 
  selectItemPerPage, 
  setBleeds, 
  setDoubleSided, 
  setItemPerPage 
} from '@/store/features/print/print';
import { useTranslation } from 'react-i18next';

export type PrintSettingsProps = {

}

export const PrintSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const itemPerPage = useAppSelector(selectItemPerPage);
  const doubleSided = useAppSelector(selectDoubleSided);
  const useBleeds = useAppSelector(selectBleeds);

  const toggleItemPerPage = () => dispatch(setItemPerPage(!itemPerPage));
  const toggleDoubleSided = () => dispatch(setDoubleSided(!doubleSided));
  const toggleBleeds = () => dispatch(setBleeds(!useBleeds));

  // const 
  return (
    <Row>
      <Checkbox 
        onChange={toggleItemPerPage} 
        checked={itemPerPage}
        containerProps={{ title: t('One per page') }}
      >
        1 / <Icon icon='file-empty'/>
      </Checkbox>
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