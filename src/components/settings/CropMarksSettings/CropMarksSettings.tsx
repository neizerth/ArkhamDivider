import { Checkbox } from '@/components/forms/Checkbox/Checkbox';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectCropMarks, setCropMarks } from '@/shared/store/features/print/print';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import S from './CropMarksSettings.module.scss';
import { selectExport } from '@/shared/store/features/app/app';

export const CropMarksSettings = () => {
  const dispatch = useAppDispatch();
  const cropMarks = useAppSelector(selectCropMarks);
  const isExport = useAppSelector(selectExport);
  const onCheck = () => dispatch(setCropMarks(!cropMarks));
  return (
    <div className={S.container}>
      <Checkbox checked={cropMarks} onChange={onCheck} disabled={isExport}>
        <Icon icon='plus-thin' />
      </Checkbox>
    </div>
  );
};
