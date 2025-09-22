import classNames from 'classnames';
import S from './SarnetskyBandBackground.module.scss';
import { DEFAULT_COLOR, storyColors } from '../../sarnetsky/SarnetskyDividerBackground/storyColors';
import { DividerProps } from '../../common/Divider/Divider';
import { DividerType } from '@/shared/types/dividers';

import ScenarioVariable from './images/scenario/scenario-variable.svg?react';
import EncounterVariable from './images/encounter/encounter.svg?react';

export const SarnetskyBandBackground = (props: DividerProps) => {
  const { type, story, scenario } = props;

  const backgroundClassName = classNames(props.className, S.background, S[`background_${type}`]);
  const code = story?.return_to_code || story?.code || '';
  const color = storyColors[code] || DEFAULT_COLOR;

  const index = scenario?.number || 1;

  const isScenario = type === DividerType.SCENARIO;

  const Variable = isScenario ? ScenarioVariable : EncounterVariable;

  return (
    <div className={S.background}>
      <div className={backgroundClassName} />
      {isScenario && (
        <div className={S.texture} style={{ backgroundPositionY: `${index * 100}%` }} />
      )}
      <Variable className={S.variable} fill={color} />
    </div>
  );
};
