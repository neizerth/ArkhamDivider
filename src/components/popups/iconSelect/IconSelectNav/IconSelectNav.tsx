import { IIconMainGroup } from '@/shared/types/icons';
import S from './IconSelectNav.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export type IconSelectNavProps = {
  icon?: string
  iconGroups: IIconMainGroup[]
  sectionRefs?: React.RefObject<HTMLDivElement>[]
  activeSection?: number
}

export const IconSelectNav = ({
  iconGroups,
  icon,
  sectionRefs,
  activeSection
}: IconSelectNavProps) => {
  const { t } = useTranslation();

  const scrollToSection = (index: number) => {
    if (!sectionRefs) {
      return
    }
    const sectionRef = sectionRefs[index];
    const node = sectionRef.current;
    if (!node) {
      return;
    }
    node.scrollIntoView();
  };

  const selectedNavIndex = icon ? iconGroups.findIndex(
    ({ groups }) => groups.some(
      ({ icons }) => icons.includes(icon)
    )
  ) : -1;

  return (
    <div className={S.container}>
      {iconGroups.map((mainGroup, index) => (
        <div 
          key={mainGroup.id}
          className={classNames(
            S.item,
            activeSection === index && S.active,
            selectedNavIndex == index && S.selected
          )}
          onClick={() => scrollToSection(index)}
        >
          {t(mainGroup.name)}
        </div>
      ))}
    </div>
  );
}