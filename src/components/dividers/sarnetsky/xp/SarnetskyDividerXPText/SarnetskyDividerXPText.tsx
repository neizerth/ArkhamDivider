import { IXPCost } from '@/types/game';
import S from './SarnetskyDividerXPText.module.scss';
import { DividerText } from '@/components/dividers/DividerText/DividerText';
import { upperFirst } from '@/util/common';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icons/Icon/Icon';

export type SarnetskyDividerXPTextProps = {
  xpCost: IXPCost
  faction: string
  icon: string
}

export const SarnetskyDividerXPText = ({
  xpCost,
  faction,
  icon
}: SarnetskyDividerXPTextProps) => {
  const { t } = useTranslation();
  const {
    level,
    max = level
  } = xpCost
  const cardsKey = `${upperFirst(faction)} Cards`;
  const cardsText = t(cardsKey);
  
  const levelKey = 'Level {{startXp}}';
  const startXp = max === level ? level : `${level}-${max}`;
  const levelText = t(levelKey, { startXp });

  return (
    <div className={S.container}>
      <div className={S.row}>
        <DividerText 
          defaultValue={cardsText} 
          inputClassName={S.input}
        />
        <div className={S.faction}>
          (<Icon icon={icon} className={S.icon}/>)
        </div>
      </div>
      <DividerText 
        defaultValue={levelText} 
        className={S.input}
      />
    </div>
  );
}