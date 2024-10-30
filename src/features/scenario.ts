import { IScenario } from "@/types/api";

export const getScenarioEncounters = ({
  encounter_sets = [],
  extra_encounter_sets = []
}: IScenario) => [
  ...encounter_sets,
  ...extra_encounter_sets
]