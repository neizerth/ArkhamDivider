import { useAppDispatch } from '@/hooks/useAppDispatch';
import S from './PrintSettings.module.scss';

import { Checkbox, Row } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { 
  selectBleeds, 
  selectDoubleSided, 
  selectItemsPerPage, 
  setBleeds, 
  setDoubleSided,
  setItemsPerPage, 
} from '@/store/features/print/print';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { selectLayout } from '@/store/features/layout/layout';
import { range } from 'ramda';

export type PrintSettingsProps = {

}

export const PrintSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const doubleSided = useAppSelector(selectDoubleSided);
  const useBleeds = useAppSelector(selectBleeds);
  const { groupSize } = useAppSelector(selectLayout);
  const itemsPerPage = useAppSelector(selectItemsPerPage);

  const toggleDoubleSided = () => dispatch(setDoubleSided(!doubleSided));
  const toggleBleeds = () => dispatch(setBleeds(!useBleeds));

  const currentItemsSize = itemsPerPage || groupSize;
  const itemsPerPageOptions = range(0, groupSize / 2 + 1)
    .map(index => {
      const value = index === 0 ? 1 : index * 2;

      return {
        label: value,
        value
      }
    });
  const currentItemsValue = {
    label: currentItemsSize,
    value: currentItemsSize
  }

  const changeItemsPerPage = (value: number) => dispatch(setItemsPerPage(value));

  // const 
  return (
    <Row>
      <Select 
        className={S.itemsPerPage}
        options={itemsPerPageOptions}
        value={currentItemsValue}
        onChange={item => item && changeItemsPerPage(item.value)}
      />
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