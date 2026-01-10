import classNames from 'classnames';
import {
  PropsWithChildren,
  ReactEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useFitText from 'use-fit-text';
import { Icon } from '@/components';
import { PropsWithClassName } from '@/shared/types/util';
import S from './DividerText.module.scss';

export type DividerTextProps = PropsWithClassName &
  PropsWithChildren & {
    inputClassName?: string;
    iconClassName?: string;
    strokeClassName?: string;
    wrapperClassName?: string;
    clearClassName?: string;
    lineClassName?: (count: number) => string;

    fixedFontSize?: boolean;
    minFontSize?: number;
    maxFontSize?: number;

    onClear?: CallableFunction;
    onChange?: (value: string) => void;
    defaultValue: string;
    fullHeight?: boolean;

    stroke?: boolean;

    clearPosition?: 'inside' | 'outside';
  };

const toText = (html: string): string => {
  const container = document.createElement('div');
  container.innerHTML = html.replace(/<br\/?>/, '\n');
  return container.textContent || '';
};

export const DividerText = ({
  stroke = false,
  strokeClassName,
  fixedFontSize = true,
  fullHeight = true,
  onClear,
  defaultValue,
  className,
  wrapperClassName,
  inputClassName,
  clearClassName,
  minFontSize,
  maxFontSize,
  clearPosition = 'inside',
  onChange,
  children,
}: DividerTextProps) => {
  const [text, setText] = useState(defaultValue);
  const isUpdatingRef = useRef(false);

  const { fontSize, ref } = useFitText({
    minFontSize,
    maxFontSize,
  });

  const onValueChange = useCallback(
    (value: string) => {
      setText(value);
      onChange?.(value);
    },
    [onChange]
  );

  const setDefaultValue = useCallback(
    (value: string) => {
      if (!ref.current || isUpdatingRef.current) {
        return;
      }

      if (ref.current.textContent === value) {
        return;
      }

      isUpdatingRef.current = true;
      ref.current.textContent = value;
      onValueChange(value);
      isUpdatingRef.current = false;
    },
    [ref, onValueChange]
  );

  const clear = useCallback(() => {
    setDefaultValue(defaultValue);
    onClear?.();
  }, [defaultValue, setDefaultValue, onClear]);

  const onTitleChange: ReactEventHandler = useCallback(
    (e) => {
      if (isUpdatingRef.current) {
        return;
      }

      const target = e.target as HTMLDivElement;
      const contents = target.textContent || '';
      const nextValue = toText(contents);

      if (!nextValue.trim()) {
        return clear();
      }

      onValueChange(nextValue);
    },
    [onValueChange, clear]
  );

  // Инициализация и обновление при изменении defaultValue
  useEffect(() => {
    setDefaultValue(defaultValue);
  }, [defaultValue, setDefaultValue]);

  const style = fixedFontSize
    ? {}
    : {
        fontSize,
        // lineHeight
      };

  return (
    <div className={classNames(S.container, fullHeight && S.fullHeight, className)}>
      <div className={classNames(S.wrapper, !fixedFontSize && S.wrapper_dynamic, wrapperClassName)}>
        <div
          contentEditable
          spellCheck={false}
          suppressContentEditableWarning
          className={classNames(S.input, inputClassName)}
          onInput={onTitleChange}
          style={style}
          ref={ref}
        />
        {children}
        {stroke && (
          <div className={classNames(S.stroke, strokeClassName)} style={style}>
            {text}
          </div>
        )}
      </div>
      <button
        className={classNames(S.clear, S[`clear_${clearPosition}`], clearClassName)}
        onClick={clear}
        type='button'
      >
        <Icon className={S.icon} icon='dismiss' />
      </button>
    </div>
  );
};
