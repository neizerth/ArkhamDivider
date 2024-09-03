import classNames from 'classnames';
import S from './Checkbox.module.scss';

export type CheckboxProps = React.ComponentProps<'input'> & {
  containerClassName?: string
};

export const Checkbox = ({ 
  containerClassName, 
  children,
  ...props 
}: CheckboxProps) => {
  return (
    <label className={classNames(S.container, containerClassName)}>
      <input type="checkbox" {...props}/>
      {children}
    </label>
  );
}