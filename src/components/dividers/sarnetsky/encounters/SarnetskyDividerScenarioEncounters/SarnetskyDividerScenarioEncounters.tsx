import { IScenario } from '@/shared/types/api';
import S from './SarnetskyDividerScenarioEncounters.module.scss';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import classNames from 'classnames';
import { getEncounterGroups } from './getEncounterGroups';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectEncounterSets } from '@/app/store/features/encounterSets/encounterSets';
import { numberBetween } from '@/shared/lib/features/util/common';

export type SarnetskyDividerScenarioEncountersBaseProps = {
  rowSize: number
  showName?: boolean
}

export const SarnetskyDividerScenarioEncounters = (props: SarnetskyDividerScenarioEncountersBaseProps & {
  scenario: IScenario
  mainScenario?: IScenario
}) => {
  const { scenario, showName, mainScenario } = props;
  const encounterSets = useAppSelector(selectEncounterSets);

  const groups = getEncounterGroups({
    mainScenario,
    scenario,
    encounterSets
  });

  return (
    <div className={classNames(S.groups, groups.length > 1 && S.groups_multiple)}>
      {groups.map((group, index) => (
        <SarnetskyDividerGroupedEncounters
          {...props}
          key={index}
          name={scenario.part_text || group.version_number.toString()}
          showName={showName || groups.length > 1}
          // name={group.version_text}
          mainEncounters={group.main}
          sideEncounters={group.side}
        />
      ))}
    </div>
  )
}

export const SarnetskyDividerGroupedEncounters = ({
  rowSize,
  showName = false,
  name,
  mainEncounters = [],
  sideEncounters,
}: SarnetskyDividerScenarioEncountersBaseProps & {
  mainEncounters?: string[]
  sideEncounters: string[]
  name: string
}) => {

  const mainSize = mainEncounters.length;
  const sideSize = sideEncounters.length;
  const totalSize = mainSize + sideSize;
  const between = numberBetween(rowSize, rowSize + 2);

  const getGroupClass = ({ length }: string[]) => {
    const closedToMax = between(length) || between(totalSize);
    return [
      S.group,
      closedToMax ? S.group_size_max : S.group_size_normal,
    ]
  }

  const wrapperClassName = classNames(
    S.wrapper,
    between(totalSize) && S.wrapper_max
  )

  const k = rowSize / 8;
  const baseGap = between(totalSize) ? 0.4 * k: 0.5 * k;
  const gap = Math.min(baseGap, 0.7);

  const groupStyle = {
    gap: `${gap}em`
  }

  return (
    <div className={classNames(S.container, showName && S.withName)}>
      {showName && (
        <div className={S.name}>{name}:</div>
      )}
      <div className={wrapperClassName}>
        {mainEncounters.length > 0 && (
          <div 
            className={classNames(
              S.main, 
              getGroupClass(mainEncounters)
            )}
            style={groupStyle}
          >
            {mainEncounters.map(icon => (
              <div 
                className={classNames(S.encounter, S.encounter_main)} 
                key={`main_${icon}`}
              >
                <Icon icon={icon}/>
              </div>
            ))}
          </div>
        )}
        {sideEncounters.length > 0 && (
          <div 
            className={classNames(S.side, getGroupClass(sideEncounters))}
            style={groupStyle}
          >
            {sideEncounters.map(icon => (
              <div 
                className={classNames(S.encounter, S.encounter_side)} 
                key={`side_${icon}`}>
                <Icon icon={icon}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}