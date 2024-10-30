import { useAppSelector } from '@/hooks/useAppSelector';
import S from './LayoutGridSettings.module.scss';
import { selectLayout } from '@/store/features/layout/layout';
import { selectItemsPerPage, selectRowsPerPage, setItemsPerPage, setRowsPerPage } from '@/store/features/print/print';
import { range } from 'ramda';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import Select from 'react-select';

export type LayoutGridSettingsProps = {

}

export const LayoutGridSettings = ({}: LayoutGridSettingsProps) => {
  const dispatch = useAppDispatch();

  const { groupSize, rowSize } = useAppSelector(selectLayout);

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

  return (
    <div className={S.container}>
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
  );
}