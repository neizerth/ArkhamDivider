import { DividerType } from '@/types/dividers';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectOrientation } from '@/store/features/layout/layout';
import { propEq } from 'ramda';
import { playerImages } from './images/player';
import S from './SarnetskyDividerBackground.module.scss';
import { ComponentProps, FC } from 'react';
import { scenarioImages } from './images/scenario';
import { encounterImages } from './images/encounter';
import { storyColors } from './storyColors';
import classNames from 'classnames';

export const SarnetskyPlayerBackground = ({ id }: {
  id: string
}) => {
  const src = playerImages.find(propEq(id, 'id'))?.background;

  return (
    <>
      {src && <img src={src} alt={id} className={S.background}/>}
    </>
  )
}

export type SarnetskyStoryBackgroundProps = {
  storyCode: string
}

export const SarnetskyScenarioBackground = ({ storyCode }: SarnetskyStoryBackgroundProps) => {
  const oritentation = useAppSelector(selectOrientation);

  const item = scenarioImages.find(
    propEq(oritentation, 'orientation')
  );

  const color = storyColors[storyCode];

  return (
    <>
      {item && (
        <SarnetskyLayeredBackground {...item} color={color}/>
      )}
    </>
  )
}

export const SarnetskyEncounterBackground = ({ storyCode }: SarnetskyStoryBackgroundProps) => {
  const oritentation = useAppSelector(selectOrientation);

  const item = encounterImages.find(
    propEq(oritentation, 'orientation')
  );

  const color = storyColors[storyCode];

  return (
    <>
      {item && (
        <SarnetskyLayeredBackground {...item} color={color}/>
      )}
    </>
  )
}

export const SarnetskyLayeredBackground = ({
  Color,
  color,
  frame,
  background
}: {
  Color: FC<ComponentProps<'svg'>>
  frame: string
  background: string
  color?: string
}) => {
  const oritentation = useAppSelector(selectOrientation);

  return (
    <div className={S.layers}>
      <img src={background} alt="background" className={S.background}/>
      <img src={frame} alt="frame" className={S.frame}/>
      <Color 
        className={classNames(
          S.color, 
          S[`color_${oritentation}`]
        )} 
        fill={color}
      />
    </div>
  )
}


export type SarnetskyDividerBackgroundProps = {
  id: string
  type: DividerType
  storyCode?: string
}

export const SarnetskyDividerBackground = ({
  id,
  type,
  storyCode
}: SarnetskyDividerBackgroundProps) => {

  return (
    <>
      {type === DividerType.PLAYER && (
        <SarnetskyPlayerBackground id={id}/>
      )}
      {[DividerType.SCENARIO, DividerType.CAMPAIGN].includes(type) && storyCode && (
        <SarnetskyScenarioBackground storyCode={storyCode}/>
      )}
      {type === DividerType.ENCOUNTER && storyCode && (
        <SarnetskyEncounterBackground storyCode={storyCode}/>
      )}
    </>
  );
}