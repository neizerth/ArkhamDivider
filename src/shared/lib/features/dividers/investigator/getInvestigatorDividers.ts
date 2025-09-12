import { groupBy, isNotNil, propEq, values } from 'ramda';
import factions from '@/shared/data/factions.json';
import { uniqId } from '@/shared/lib/features/util/common';
import type { IInvestigator } from '@/shared/types/api';
import { DividerType, type IDivider } from '@/shared/types/dividers';

export const getInvestigatorDividers = ({
  investigators,
  doubleSided = false,
  duplicateCodes = {},
}: {
  investigators: IInvestigator[];
  doubleSided?: boolean;
  duplicateCodes?: Record<string, number>;
}): IDivider[] => {
  const investigatorGroups = groupBy(
    ({ faction_code, name }) => `${name}-${faction_code}`,
    investigators
  );
  const data = values(investigatorGroups)
    .filter(isNotNil)
    .map((group) => group[0]);

  const sideA = data
    .flatMap((investigator) => {
      const { name, faction_code } = investigator;

      const faction = factions.find(propEq(faction_code, 'id'));
      if (!faction) {
        return;
      }
      const count = duplicateCodes[investigator.code] || 1;
      const { icon } = faction;
      return Array.from({ length: count }, () => ({
        id: uniqId(),
        faction: faction.id,
        investigator,
        type: DividerType.INVESTIGATOR,
        specialIcon: 'per_investigator',
        name,
        icon,
      }));
    })
    .filter(isNotNil);

  const sideB = doubleSided
    ? sideA.map((divider) => ({
        ...divider,
        id: uniqId(),
        backId: divider.id,
      }))
    : [];

  return [...sideA, ...sideB];
};
