import classNames from 'classnames';
import S from './Checkbox.module.scss';

export type CheckboxProps = React.ComponentProps<'input'> & {
  containerClassName?: string
  labelClassName?: string
};

export const Checkbox = ({ 
  containerClassName,
  labelClassName,
  children,
  ...props 
}: CheckboxProps) => {
  return (
    <label className={classNames(S.container, containerClassName)}>
      <input type="checkbox" {...props} className={S.input}/>
      <span className={classNames(S.label, labelClassName)}>
        {children}
      </span>
    </label>
  );
}