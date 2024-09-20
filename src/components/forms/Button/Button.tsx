import classNames from 'classnames';
import S from './Button.module.scss'
import { ButtonType } from '@/types/ui';

export type ButtonProps = React.ComponentProps<'button'> & {
  buttonType?: ButtonType;
}

export const Button = ({ 
  className, 
  buttonType = ButtonType.PRIMARY, 
  ...props 
}: ButtonProps) => {
  return (
    <button {...props} className={classNames(
      S.container,
      buttonType && S[buttonType], 
      className
    )}/>
  );
}