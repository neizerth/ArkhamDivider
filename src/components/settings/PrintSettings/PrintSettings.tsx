import { useAppDispatch } from '@/hooks/useAppDispatch';

import { Checkbox, Row } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectBleeds, selectDoubleSided, setBleeds, setDoubleSided } from '@/store/features/print/print';

export type PrintSettingsProps = {

}

export const PrintSettings = () => {
  const dispatch = useAppDispatch();
  const doubleSided = useAppSelector(selectDoubleSided);
  const useBleeds = useAppSelector(selectBleeds);

  const toggleDoubleSided = () => dispatch(setDoubleSided(!doubleSided));
  const toggleBleeds = () => dispatch(setBleeds(!useBleeds));
  return (
    <Row>
      <Checkbox onChange={toggleDoubleSided} checked={doubleSided}>
        Double-sided
      </Checkbox>
      <Checkbox onChange={toggleBleeds} checked={useBleeds}>
        Bleeds
      </Checkbox>
    </Row>
  );
}