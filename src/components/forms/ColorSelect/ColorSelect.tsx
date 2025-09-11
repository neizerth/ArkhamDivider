import classNames from 'classnames';
import { Color, Row } from '@/components';
import S from './ColorSelect.module.scss';

export type ColorOption<T> = {
  color: string;
  value: T;
};

export type ColorSelectProps<T> = {
  colors: ColorOption<T>[];
  value?: T;
  onChange: (option: ColorOption<T>) => void;
};

export function ColorSelect<T>({ colors, value, onChange }: ColorSelectProps<T>) {
  return (
    <Row gap={false} className={S.container}>
      {colors.map((option) => (
        <Color
          key={option.color}
          color={option.color}
          onClick={() => onChange(option)}
          className={classNames(S.color, option.value === value && S.selected)}
        />
      ))}
    </Row>
  );
}
