import classNames from 'classnames';
import S from './SarnetskyBandBackground.module.scss';
import { DEFAULT_COLOR, storyColors } from '../../sarnetsky/SarnetskyDividerBackground/storyColors';
import { DividerProps } from '../../common/Divider/Divider';
import { DividerType } from '@/shared/types/dividers';

import ScenarioVariable from './images/scenario/scenario-variable.svg?react';
import EncounterVariable from './images/encounter/encounter.svg?react';
import StandaloneVariable from './images/standalone/standalone-variable.svg?react';
import { selectLayout } from '@/shared/store/features/layout/layout';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';

export const SarnetskyBandBackground = (props: DividerProps & { concealed?: boolean }) => {
  const { type, story, scenario, concealed } = props;

  const layout = useAppSelector(selectLayout);

  const isStandalone = layout.id === 'sarnetsky-band_standalone';

  const backgroundClassName = classNames(props.className, S.background, S[`background_${type}`], {
    [S.background_standalone]: isStandalone,
    [S.background_concealed]: concealed,
  });
  const code = story?.return_to_code || story?.code || '';
  const color = storyColors[code] || DEFAULT_COLOR;

  const index = scenario?.number || 1;

  const isScenario = type === DividerType.SCENARIO;

  const Variable = isStandalone
    ? StandaloneVariable
    : isScenario
      ? ScenarioVariable
      : EncounterVariable;

  return (
    <div className={S.background}>
      {concealed ? (
        <div className={S.concealedBackground} />
      ) : (
        <>
          <div className={backgroundClassName} />
          {isScenario && (
            <div className={S.texture} style={{ backgroundPositionY: `${index * 100}%` }} />
          )}
          <Variable className={S.variable} fill={color} />
        </>
      )}
    </div>
  );
};
