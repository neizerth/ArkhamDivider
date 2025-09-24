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
import { selectLayout } from '@/shared/store/features/layout/layout';
import { NotExportable } from '@/components/ui/behavior/NotExportable/NotExportable';
import { DividerMenu } from '../../common/DividerMenu/DividerMenu';

export const SarnetskyBandDivider = (props: DividerProps) => {
  const language = useAppSelector(selectLanguage);
  const layout = useAppSelector(selectLayout);

  const isStandalone = layout.id === 'sarnetsky-band_standalone';
  const { type, story, id } = props;

  const size = Math.min(props.size || 0, 10);

  const { t } = useStoryTranslation(story);

  const name = t(props.name || '');

  const isConcealed =
    type === DividerType.ENCOUNTER && story?.code === 'tsk' && props?.customParams?.concealed;

  const containerClassName = classNames(S.container, S[language], S[type], {
    [S.standalone]: isStandalone,
    [S.concealed]: isConcealed,
  });

  const [icon, selectIcon] = useIconSelect({
    defaultIcon: props.icon,
  });

  const right = Math.max(size * 0.234) + 4.9;

  // const gap = isVariableSize ? Math.max(size * 0.234, 4) : 4;

  // const gap = isScenario || isStandalone ? 0 : 0.8;

  // const

  return (
    <div className={containerClassName}>
      <DividerContent>
        <SarnetskyBandBackground {...props} className={S.backround} concealed={isConcealed} />
        {isConcealed && <div className={S.concealedBackground} />}
        <div className={S.content}>
          {!isConcealed && (
            <div className={S.icon} onClick={selectIcon}>
              <CircleIcon icon={icon || ''} className={S.iconItem} />
            </div>
          )}
          <div className={S.text} style={{ right: `${right}mm` }} title={`size: ${size}`}>
            <DividerText
              defaultValue={name}
              inputClassName={S.input}
              fullHeight={false}
              className={S.inputContainer}
            />
          </div>
        </div>
        <NotExportable>
          <div className={S.menu}>
            <DividerMenu id={id} className={S.menuContainer} />
          </div>
        </NotExportable>
      </DividerContent>
    </div>
  );
};
