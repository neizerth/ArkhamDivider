// import S from './PageSizeSettings.module.scss';
import { getLayoutGrid } from '@/features/layouts/getLayoutGrid';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
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

  const options = Object.entries(PageSize)
    .map(([label, value]) => ({
      label: label as PageSizeType,
      value
    }));

  const value = options.find(({ label }) => label === pageSizeType);

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
      onChange={item => item && onChange(item.label)}
      options={options}
      value={value}
    />
  );
}