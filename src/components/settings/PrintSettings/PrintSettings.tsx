import { useAppDispatch } from '@/hooks/useAppDispatch';
import S from './PrintSettings.module.scss';

import { Checkbox, Row } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { 
  selectBleeds, 
  selectDoubleSided, 
  selectItemsPerPage, 
  selectRowsPerPage, 
  setBleeds, 
  setDoubleSided,
  setItemsPerPage,
  setRowsPerPage, 
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
  const { groupSize, rowSize } = useAppSelector(selectLayout);

  const toggleDoubleSided = () => dispatch(setDoubleSided(!doubleSided));
  const toggleBleeds = () => dispatch(setBleeds(!useBleeds));

  const itemsPerPage = useAppSelector(selectItemsPerPage);
  const rowsPerPage = useAppSelector(selectRowsPerPage);
  const colSize = itemsPerPage / rowsPerPage;

  const rowsOptions = range(1, rowSize + 1)
    .map(value => {
      return {
        label: value,
        value
      }
    });

  const rowsValue = {
    label: rowsPerPage,
    value: rowsPerPage
  }

  const colsOptions = range(1, groupSize / 2 + 1)
    .map(value => {
      return {
        label: value,
        value
      }
    });

  const colsValue = {
    label: colSize,
    value: colSize
  }

  const changeColsPerPage = (cols: number) => dispatch(
    setItemsPerPage(cols * rowsPerPage)
  );
  const changeRowsPerPage = (rows: number) => {
    dispatch(setRowsPerPage(rows));
    dispatch(setItemsPerPage(rows * colSize))
  };

  // const 
  return (
    <Row>
      <div className={S.grid}>
        <Select 
          className={S.rows}
          options={rowsOptions}
          value={rowsValue}
          onChange={item => item && changeRowsPerPage(item.value)}
        />
        x
        <Select 
          className={S.cols}
          options={colsOptions}
          value={colsValue}
          onChange={item => item && changeColsPerPage(item.value)}
        />
      </div>
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