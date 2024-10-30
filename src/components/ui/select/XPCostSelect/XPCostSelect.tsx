import { IXPCost } from "@/types/game";
import { ToggleSelect } from '../ToggleSelect/ToggleSelect';
import S from './XPCostSelect.module.scss';
import { fixedXPCosts } from "@/data/fixedXPCosts";
import { Col, IconButton, Row, XPSlider } from "@/components";
import { ButtonType } from "@/types/ui";
import { useState } from "react";
import { getXPDisplayValue } from "@/features/xp";
import { propEq } from "ramda";

export type XPCostSelectProps = {
  onChange: (data: IXPCost[]) => void
}

export type IXPCostRange = [number, number];

export const XPCostSelect = (props: XPCostSelectProps) => {
  const xpCosts = fixedXPCosts;
  const defaultRangeValue: [number, number] = [1, 2];
  const [currentRange, setRange] = useState<IXPCostRange>(defaultRangeValue); 
  const [data, setData] = useState<IXPCost[]>([]);

  const ranges = data.filter(propEq(false, 'is_fixed'));

  // const onChange = () => {
  //   const fixedRanges = 
  // }

  const onFixedChange = (selected: IXPCost[]) => onValueChange([
    ...data.filter(propEq(false, 'is_fixed')),
    ...selected
  ])

  const onValueChange = (data: IXPCost[]) => {
    setData(data);
    props.onChange(data);
  }

  const addRange = () => {
    const [min, max] = currentRange;

    onValueChange([
      ...ranges,
      ...data.filter(propEq(true, 'is_fixed')),
      {
        value: getXPDisplayValue(min, max),
        level: min,
        max,
        is_fixed: false
      }
    ])
  }

  const removeRange = (removeValue: string) => onValueChange(
    data.filter(
      ({ value, is_fixed }) => is_fixed || value !== removeValue
    )
  );

  return (
    <Col className={S.container}>
      <ToggleSelect 
        value={xpCosts}
        className={S.container} 
        onChange={onFixedChange}
      />
      <Row className={S.row} wrap>
        <div className={S.slider}>
          <XPSlider
            onChange={setRange} 
            defaultValue={defaultRangeValue}
          />
        </div>
        <IconButton 
          icon='plus-thin' 
          buttonType={ButtonType.SECONDARY}
          onClick={addRange}
        />
      </Row>
      <div className={S.ranges}>
        {ranges.map(({value}) => (
          <div
            className={S.range}
            key={value}
            onClick={() => removeRange(value)}
          >
            {value}
          </div>
        ))}
      </div>
      
    </Col>
  );
}