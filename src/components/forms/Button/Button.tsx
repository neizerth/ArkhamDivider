import classNames from 'classnames';
import S from './Button.module.scss';

export type ButtonProps = React.ComponentProps<'button'>;

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={classNames(S.container, className)}/>
  );
}