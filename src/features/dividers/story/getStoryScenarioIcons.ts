import { IEncounterSet, IStory } from "@/types/api"
import { isNotNil, propEq } from "ramda"

export const getStoryScenarioIcons = ({
  story,
  encounterSets
}: {
  story: IStory
  encounterSets: IEncounterSet[]
}) => {
  return story.scenario_encounter_sets
    .map(code => {
      return encounterSets.find(
        propEq(code, 'code')
      )?.icon
    })
    .filter(isNotNil);
}