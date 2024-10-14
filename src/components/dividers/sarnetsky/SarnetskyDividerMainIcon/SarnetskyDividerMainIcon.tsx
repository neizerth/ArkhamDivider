import { PropsWithClassName } from '@/types/util';
import S from './SarnetskyDividerMainIcon.module.scss';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

export type SarnetskyDividerMainIconProps = PropsWithClassName & {
  icon: string
  dynamicHeight?: boolean
}

export const SarnetskyDividerMainIcon = ({
  className,
  dynamicHeight,
  icon
}: SarnetskyDividerMainIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<string>(); 

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (!dynamicHeight) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const fontSize = `${rect.height * 0.8}px`;
    setFontSize(fontSize);
  }, [ref, dynamicHeight]);

  const style = { fontSize };

  return (
    <div className={classNames(S.container, className)} ref={ref} style={style}>
      <div className={classNames(S.icon)}>
        <Icon icon={icon}/>
      </div>
    </div>
  );
}