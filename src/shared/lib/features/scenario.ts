import { IScenario } from "@/shared/types/api";

export const getScenarioEncounters = ({
  encounter_sets = [],
  extra_encounter_sets = []
}: IScenario) => [
  ...encounter_sets,
  ...extra_encounter_sets
]