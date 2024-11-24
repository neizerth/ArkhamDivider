import { IInvestigator } from "@/types/api"
import { DividerType, IDivider } from "@/types/dividers"
import { uniqId } from "@/util/common"
import factions from '@/data/factions.json'
import { groupBy, isNotNil, prop, propEq, values } from "ramda"

export const getInvestigatorDividers = ({
  investigators
}: {
  investigators: IInvestigator[]
}): IDivider[] => {
  const data = values(
      groupBy(prop('name'), investigators)
    )
    .filter(isNotNil)
    .map(group => group[0]);

  return data.map(investigator => {
    const { 
      name,
      faction_code
    } = investigator;
    
    const faction = factions.find(
      propEq(faction_code, 'id')
    );
    if (!faction) {
      return;
    }
    const { icon } = faction;
    return {
      id: uniqId(),
      faction: faction.id,
      investigator,
      type: DividerType.INVESTIGATOR,
      specialIcon: 'per_investigator',
      name,
      icon
    }
  })
  .filter(isNotNil)
}