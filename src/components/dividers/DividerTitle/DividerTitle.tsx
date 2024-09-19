import { Icon } from '@/components/ui/Icon/Icon';
import S from './DividerTitle.module.scss';
import { ReactEventHandler } from 'react';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';

export type DividerTitleProps = PropsWithClassName & {
  inputClassName?: string
  iconClassName?: string

  onClear: CallableFunction
  onChange: (value: string) => void
  title: string
}

export const DividerTitle = ({
  onClear,
  title,
  className,
  inputClassName,
  ...props
}: DividerTitleProps) => {
  
  const onTitleChange: ReactEventHandler = e => {
		const target = e.target as HTMLInputElement;
		const { value } = target;
		props.onChange(value);
	}

  return (
    <div className={classNames(S.container, className)}>
      <input className={classNames(S.input, inputClassName)} onInput={onTitleChange} value={title}/>

      <div 
        className={classNames(S.clear, inputClassName)} 
        onClick={() => onClear()}
      >
        <Icon icon="dismiss"/>
      </div>
     
    </div>
  );
}