import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';
import { MAX_XP } from '@/shared/config/xp';
import S from './XPSlider.module.scss';

export type XPSliderProps = {
  onChange: (value: [number, number]) => void;
  defaultValue?: [number, number];
};

export const XPSlider = ({ onChange, defaultValue }: XPSliderProps) => {
  const [currentValue, setCurrentValue] = useState<[number, number]>(defaultValue || [0, MAX_XP]);

  const handleValueChange = (value: number[]) => {
    if (value.length === 2) {
      const newValue: [number, number] = [value[0], value[1]];
      setCurrentValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className={S.container}>
      <Slider.Root
        className={S.slider}
        min={0}
        max={MAX_XP}
        step={1}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
      >
        <Slider.Track className={S.track}>
          <Slider.Range className={S.range} />
        </Slider.Track>
        <Slider.Thumb className={S.thumb} aria-label='Minimum value'>
          <span className={S.value}>{currentValue[0]}</span>
        </Slider.Thumb>
        <Slider.Thumb className={S.thumb} aria-label='Maximum value'>
          <span className={S.value}>{currentValue[1]}</span>
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
};
