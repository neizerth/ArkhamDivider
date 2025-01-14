import S from './PageSizeSettings.module.scss';
import { getLayoutGrid } from '@/features/layouts/getLayoutGrid';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectExport } from '@/store/features/app/app';
import { selectLayout } from '@/store/features/layout/layout';
import { selectBleed, selectPageSizeType, setItemsPerPage, setPageOrientation, setPageSizeType, setRowsPerPage } from '@/store/features/print/print';
import { PageSize, PageSizeType } from '@/types/print';
import Select from 'react-select';

export type PageSizeSettingsProps = {

}

export const PageSizeSettings = ({}: PageSizeSettingsProps) => {
  const dispatch = useAppDispatch();
  const pageSizeType = useAppSelector(selectPageSizeType);
  const layout = useAppSelector(selectLayout);
  const bleed = useAppSelector(selectBleed);
  const isExport = useAppSelector(selectExport);

  const pageSizes = Object.keys(PageSize) as PageSizeType[];
  const options = pageSizes
    .map(value => ({
      label: value,
      value
    }));

  const value = options.find(({ value }) => value === pageSizeType);

  const onChange = (pageSizeType: PageSizeType) => {
    const grid = getLayoutGrid({
      layout,
      bleed,
      pageSizeType
    });

    dispatch(setPageSizeType(pageSizeType));
    dispatch(setItemsPerPage(grid.itemsPerPage));
    dispatch(setPageOrientation(grid.pageOrientation));
    dispatch(setRowsPerPage(grid.rowsPerPage));
  }

  return (
    <Select
      className={S.select}
      onChange={item => item && onChange(item.value)}
      options={options}
      value={value}
      isDisabled={isExport}
    />
  );
}