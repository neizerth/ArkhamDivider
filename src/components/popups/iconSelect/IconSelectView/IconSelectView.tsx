import { IIconMainGroup } from '@/shared/types/icons';
import S from './IconSelectView.module.scss';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import { useTranslation } from 'react-i18next';
import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';

export type IconSelectViewProps = {
  onChange: (icon: string) => void
  defaultIcon?: string;
  iconGroups: IIconMainGroup[]
  sectionRefs: React.RefObject<HTMLDivElement>[]
}

export const IconSelectView = forwardRef((
  props: IconSelectViewProps, 
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    iconGroups,
    sectionRefs,
    defaultIcon,
    onChange
  } = props;

  const [currentIcon, setCurrentIcon] = useState(defaultIcon);
  const { t } = useTranslation();

  useEffect(() => {
    setCurrentIcon(defaultIcon);
  }, [defaultIcon])
  const changeIcon = (icon: string) => {
    setCurrentIcon(icon);
    onChange(icon);
  }

  return (
    <div className={S.container} ref={ref}>
      {iconGroups.map((mainGroup, index) => (
        <div 
          key={mainGroup.id} 
          className={S.mainGroup}
          id={`icon-group-${mainGroup.id}`}
          ref={sectionRefs[index]}
        >
          <h2 className={S.mainGroupTitle}>{t(mainGroup.name)}</h2>
          <div className={S.mainGroupItems}>
            {mainGroup.groups.map(group => (
              <div key={group.id} className={S.group}>
                {group.name && (
                  <h3 className={S.groupTitle}>{t(group.name)}</h3>
                )}
                <div className={S.icons}>
                  {group.icons.map(icon => (
                    <div 
                      key={icon} 
                      className={classNames(
                        S.icon,
                        currentIcon === icon && S.selected
                      )} 
                      title={icon}
                      onClick={() => changeIcon(icon)}
                    >
                      <Icon icon={icon}/>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
})