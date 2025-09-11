import { propEq } from 'ramda';
import { useState } from 'react';
import { Col, IconButton, Row, XPSlider } from '@/components';
import { fixedXPCosts } from '@/shared/data/fixedXPCosts';
import { getXPDisplayValue } from '@/shared/lib/features/xp';
import { IXPCost } from '@/shared/types/game';
import { ButtonType } from '@/shared/types/ui';
import {
  ToggleSelect,
  ToggleSelectItem,
  ToggleSelectItemProps,
} from '../ToggleSelect/ToggleSelect';
import S from './XPCostSelect.module.scss';

export type XPCostSelectProps = {
  onChange: (data: IXPCost[]) => void;
};

export type IXPCostRange = [number, number];

export const XPCostItem = (props: ToggleSelectItemProps<IXPCost>) => {
  const xpCost = props.value;

  return <ToggleSelectItem {...props}>{xpCost.value}</ToggleSelectItem>;
};

export const XPCostSelect = (props: XPCostSelectProps) => {
  const defaultRangeValue: [number, number] = [1, 2];
  const [currentRange, setRange] = useState<IXPCostRange>(defaultRangeValue);
  const [data, setData] = useState<IXPCost[]>([]);

  const ranges = data.filter(propEq(false, 'is_fixed'));

  // const onChange = () => {
  //   const fixedRanges =
  // }

  const onFixedChange = (selected: IXPCost[]) =>
    onValueChange([...data.filter(propEq(false, 'is_fixed')), ...selected]);

  const onValueChange = (data: IXPCost[]) => {
    setData(data);
    props.onChange(data);
  };

  const addRange = () => {
    const [min, max] = currentRange;

    onValueChange([
      ...ranges,
      ...data.filter(propEq(true, 'is_fixed')),
      {
        value: getXPDisplayValue(min, max),
        level: min,
        max,
        is_fixed: false,
      },
    ]);
  };

  const removeRange = (removeValue: string) =>
    onValueChange(data.filter(({ value, is_fixed }) => is_fixed || value !== removeValue));

  const components = {
    Item: XPCostItem,
  };

  return (
    <Col className={S.container}>
      <ToggleSelect
        value={fixedXPCosts}
        className={S.container}
        onChange={onFixedChange}
        components={components}
      />
      <Row className={S.row} wrap>
        <div className={S.slider}>
          <XPSlider onChange={setRange} defaultValue={defaultRangeValue} />
        </div>
        <IconButton icon='plus-thin' buttonType={ButtonType.SECONDARY} onClick={addRange} />
      </Row>
      <div className={S.ranges}>
        {ranges.map(({ value }) => (
          <div className={S.range} key={value} onClick={() => removeRange(value)}>
            {value}
          </div>
        ))}
      </div>
    </Col>
  );
};
