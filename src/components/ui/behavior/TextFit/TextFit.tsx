import { ComponentProps } from 'react';
import S from './TextFit.module.scss';
import useFitText, { TOptions } from 'use-fit-text';
import classNames from 'classnames';

export type TextFitProps = ComponentProps<'div'> & TOptions & {
  text: string
  stroke?: boolean
  strokeClassName?: string
}

export const TextFit = ({ 
  text, 
  stroke,
  strokeClassName,
  className,
  ...props 
}: TextFitProps) => {
  const { fontSize, ref } = useFitText(props);
  const styles = {
    fontSize,
  }
  return (
    <div 
      className={classNames(
        S.container,
        className
      )}
      style={styles}
      ref={ref}
    >
      <span className={S.text}>
        {text}
      </span>
      {stroke && (
        <div 
          className={classNames(
            S.stroke,
            strokeClassName
          )}
          style={styles}
        >
          {text}
        </div>
      )}
    </div>
  );
}