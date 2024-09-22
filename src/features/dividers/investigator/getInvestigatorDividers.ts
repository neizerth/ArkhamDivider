import { IInvestigator } from "@/types/api"
import { IDivider } from "@/types/dividers"
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
      type: 'investigator',
      name,
      icon
    }
  })
  .filter(isNotNil)
}