import { selectLanguage } from '@/shared/store/features/language/language';
import { DividerProps } from '../../common/Divider/Divider';
import S from './SarnetskyBandDivider.module.scss';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { DividerContent } from '../../common/DividerContent/DividerContent';
import classNames from 'classnames';
import { CircleIcon } from '@/components/ui/icons/CircleIcon/CircleIcon';
import { useIconSelect } from '@/shared/lib/hooks/useIconSelect';
import { SarnetskyBandBackground } from '../SarnetskyBandBackground/SarnetskyBandBackground';
import { DividerText } from '../../common/DividerText/DividerText';
import { useStoryTranslation } from '@/shared/lib/hooks/useStoryTranslation';
import { DividerType } from '@/shared/types/dividers';

export const SarnetskyBandDivider = (props: DividerProps) => {
  const language = useAppSelector(selectLanguage);
  const { type, story, size = 0 } = props;

  const { t } = useStoryTranslation(story);

  const name = t(props.name || '');

  const containerClassName = classNames(S.container, S[language], S[type]);

  const isScenario = type === DividerType.SCENARIO;

  const [icon, selectIcon] = useIconSelect({
    defaultIcon: props.icon,
  });

  const gap = isScenario ? Math.max(size * 0.234, 4) : 4;

  return (
    <div className={containerClassName}>
      <DividerContent>
        <SarnetskyBandBackground {...props} className={S.backround} />
        <div className={S.content} style={{ gap: `${gap}mm` }}>
          <div className={S.icon} onClick={selectIcon}>
            <CircleIcon icon={icon || ''} className={S.iconItem} />
          </div>
          <div className={S.text}>
            <DividerText
              defaultValue={name}
              inputClassName={S.input}
              fixedFontSize={false}
              minFontSize={88}
            />
          </div>
        </div>
      </DividerContent>
    </div>
  );
};
