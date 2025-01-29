import type { IScenario } from "@/shared/model/types/api";
import { SarnetskyDividerScenarioEncounters } from "../SarnetskyDividerScenarioEncounters/SarnetskyDividerScenarioEncounters";
import S from "./SarnetskyDividerLinkedScenarioEncounters.module.scss";
import { getScenarioGroups } from "./getScenarioGroups";

export type SarnetskyDividerLinkedScenarioEncountersProps = {
	mainScenario: IScenario;
	scenarios: IScenario[];
	rowSize: number;
};

export const SarnetskyDividerLinkedScenarioEncounters = ({
	mainScenario,
	scenarios,
	rowSize,
}: SarnetskyDividerLinkedScenarioEncountersProps) => {
	const scenarioGroups = getScenarioGroups(scenarios);

	return (
		<div className={S.container}>
			{scenarioGroups.length === 1 && (
				<SarnetskyDividerScenarioEncounters
					mainScenario={mainScenario}
					scenario={scenarios[0]}
					rowSize={rowSize}
				/>
			)}
			{scenarioGroups.length > 1 && (
				<div className={S.group}>
					{scenarioGroups.map((group, index) => (
						<SarnetskyDividerScenarioEncounters
							key={index}
							showName
							mainScenario={mainScenario}
							scenario={group[0]}
							rowSize={rowSize}
						/>
					))}
				</div>
			)}
		</div>
	);
};
