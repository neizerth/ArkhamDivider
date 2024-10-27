import { ComponentProps } from 'react';
import S from './TextFit.module.scss';
import useFitText, { TOptions } from 'use-fit-text';

export type TextFitProps = ComponentProps<'div'> & TOptions & {
  text: string
}

export const TextFit = ({ text, ...props }: TextFitProps) => {
  const { fontSize, ref } = useFitText(props);
  const styles = {
    fontSize,
  }
  return (
    <div 
      className={S.container}
      style={styles}
    >
      <div ref={ref}>{text}</div>
    </div>
  );
}