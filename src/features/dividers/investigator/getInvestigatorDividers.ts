import { IInvestigator } from "@/types/api"
import { DividerType, IDivider } from "@/types/dividers"
import { uniqId } from "@/util/common"
import factions from '@/data/factions.json'
import { isNotNil, propEq } from "ramda"

export const getInvestigatorDividers = ({
  investigators
}: {
  investigators: IInvestigator[]
}): IDivider[] => {
  return investigators.map(({ 
    name,
    faction_code
  }) => {
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
      type: DividerType.INVESTIGATOR,
      name,
      icon
    }
  })
  .filter(isNotNil)
}