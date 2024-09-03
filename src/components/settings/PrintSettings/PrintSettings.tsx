import { useAppDispatch } from '@/hooks/useAppDispatch';
import S from './PrintSettings.module.scss';

import { Checkbox } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectDoubleSided, setDoubleSided } from '@/store/features/print/print';

export type PrintSettingsProps = {

}

export const PrintSettings = () => {
  const dispatch = useAppDispatch();
  const doubleSided = useAppSelector(selectDoubleSided);

  const toggleDoubleSided = () => dispatch(setDoubleSided(!doubleSided));
  return (
    <div>
      <Checkbox onChange={toggleDoubleSided} checked={doubleSided}>
        Double-sided
      </Checkbox>
    </div>
  );
}