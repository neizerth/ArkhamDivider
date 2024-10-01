import { IEncounterSetGroup, IScenario } from '@/types/api';
import S from './SarnetskyDividerScenarioEncounters.module.scss';
import { Icon } from '@/components/ui/Icon/Icon';
import classNames from 'classnames';
import { getEcnounterGroups } from './getEncounterGroups';

export type SarnetskyDividerScenarioEncountersProps = {
  scenario: IScenario
  ecnounterGroups: IEncounterSetGroup[]
  rowSize: number
}

export const SarnetskyDividerScenarioEncounters = ({
  scenario,
  ecnounterGroups,
  rowSize
}: SarnetskyDividerScenarioEncountersProps) => {

  const groups = getEcnounterGroups(ecnounterGroups);

  const mainSize = groups.main.length;
  const sideSize = groups.side.length;
  const totalSize = mainSize + sideSize;

  const getGroupClass = ({ length }: string[]) => {
    return [
      S.group,
      (totalSize === rowSize || length === rowSize) ? 
        S.group_size_max : 
        S.group_size_normal
    ]
  }

  const wrapperClassName = classNames(
    S.wrapper,
    totalSize === rowSize && S.wrapper_max
  )

  return (
    <div className={S.container}>
      <div className={wrapperClassName}>
        {groups.main.length > 0 && (
          <div className={classNames(S.main, getGroupClass(groups.main))}>
            {groups.main.map(icon => (
              <div className={classNames(S.encounter, S.encounter_main)} key={icon}>
                <Icon icon={icon}/>
              </div>
            ))}
          </div>
        )}
        {groups.side.length > 0 && (
          <div className={classNames(S.side, getGroupClass(groups.side))}>
            {groups.side.map(icon => (
              <div 
                className={classNames(S.encounter, S.encounter_side)} 
                key={icon}>
                <Icon icon={icon}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}