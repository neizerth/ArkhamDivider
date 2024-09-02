import S from './IconButton.module.scss';
import classNames from 'classnames';
import { Icon, Button } from '@/components';

export type IconButtonProps = React.ComponentProps<Button> &{
  icon: string,
  iconClassName?: string
};

export const IconButton = ({ 
  className,
  iconClassName,
  children,
  icon,
  ...props
}: IconButtonProps) => {
  return (
    <Button {...props} className={classNames(S.container, className)}>
      <Icon icon={icon} className={classNames(S.icon, iconClassName)}/>
      {children}
    </Button>
  );
}