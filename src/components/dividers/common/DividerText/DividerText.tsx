import { Icon } from '@/components';
import S from './DividerText.module.scss';
import { ReactEventHandler, useEffect, useState } from 'react';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';
import sanitizeHtml from 'sanitize-html';
import useFitText from "use-fit-text";

export type DividerTextProps = PropsWithClassName & {
  inputClassName?: string
  iconClassName?: string
  lineClassName?: (count: number) => string

  fixedFontSize?: boolean
  minFontSize?: number
  maxFontSize?: number

  onClear?: CallableFunction
  onChange?: (value: string) => void
  defaultValue: string
  fullHeight?: boolean
}

const toText = (html: string): string => 
  sanitizeHtml(html, {
    allowedTags: ['br']
  })
  .replace(/<br>/, '\n');


export const DividerText = ({
  fixedFontSize = true,
  fullHeight = true,
  onClear,
  defaultValue,
  className,
  inputClassName,
  minFontSize,
  maxFontSize,
  onChange
}: DividerTextProps) => {

  const [_, setInitialValue] = useState(defaultValue);
  // const ref = useRef<HTMLDivElement>(null)

  const { fontSize, ref } = useFitText({
    minFontSize,
    maxFontSize
  });
  // console.log({ linesValue });

  const onValueChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  }

  const setDefaultValue = (value: string) => {
    if (!ref.current) {
      return;
    }
    ref.current.textContent = value;

    onValueChange(value);
    setInitialValue(value);
  }

  const onTitleChange: ReactEventHandler = e => {
		const target = e.target as HTMLDivElement;
    const contents = target.textContent || '';
    const nextValue = toText(contents);

    if (!nextValue.trim()) {
      return clear();
    }

    onValueChange(nextValue);
	}

  const clear = () => {

    setDefaultValue(defaultValue);

    if (!onClear) {
      return;
    }
    onClear();
  }
    
  useEffect(() => {
    setDefaultValue(defaultValue);
  }, [defaultValue]);

  const style = fixedFontSize ? {} : {
    fontSize,
    // lineHeight 
  }

  return (
    <div className={classNames(
      S.container,
      fullHeight && S.fullHeight,
      className
    )}>
      <div 
        className={classNames(S.wrapper, !fixedFontSize && S.wrapper_dynamic)}
      >
        <div
          contentEditable 
          spellCheck={false}
          suppressContentEditableWarning
          className={classNames(S.input, inputClassName)}
          onInput={onTitleChange}
          style={style}
          ref={ref}
        />
      </div>
      <div 
        className={classNames(S.clear)} 
        onClick={clear}
      >
        <Icon className={S.icon} icon="dismiss"/>
      </div>
    </div>
  );
}