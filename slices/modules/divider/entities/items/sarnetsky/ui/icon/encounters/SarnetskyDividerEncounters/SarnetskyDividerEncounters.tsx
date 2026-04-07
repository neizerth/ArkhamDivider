import { Stack, type StackProps } from "@mui/material";
import { useMemo } from "react";
import { useDividerIconRects } from "@/modules/divider/entities/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useScenarioEncounterSetGroups } from "@/modules/story/entities/lib";
import type { StoryScenario } from "@/modules/story/shared/model";
import { useSarnetskyDividerContext } from "../../../SarnetskyDividerContext";
import { SarnetskyDividerEncounterSetGroup as EncounterSetGroup } from "../SarnetskyDividerEncounterSetGroup";
import * as S from "./SarnetskyDividerEncounters.styles";
import { useEncounterIcons } from "./useEncounterIcons";

type SarnetskyDividerEncountersProps = StackProps & {
	scenario: StoryScenario;
};

export function SarnetskyDividerEncounters({
	scenario,
	...props
}: SarnetskyDividerEncountersProps) {
	const { containerRef, divider, layout } = useSarnetskyDividerContext();

	const groups = useScenarioEncounterSetGroups(scenario);
	const rows = groups.length;

	const getPrintSx = usePrintUnit({
		rows,
	});

	const totalIcons = useMemo(() => {
		return groups.reduce((acc, { group }) => {
			return acc + group.main.length + group.side.length;
		}, 0);
	}, [groups]);

	const onIconsRender = useEncounterIcons({
		dividerId: divider.id,
	});

	const setIconRef = useDividerIconRects({
		ref: containerRef,
		total: totalIcons,
		onRender: onIconsRender,
		containerWidth: layout.size.width,
	});

	if (groups.length === 0) {
		return null;
	}

	const containerSx = getPrintSx(S.getContainerSx);
	const sx = {
		...containerSx,
		...props.sx,
	};

	return (
		<Stack {...props} sx={sx}>
			{groups.map(({ id, group, groupName, showName }) => (
				<EncounterSetGroup
					key={id}
					group={group}
					groupName={groupName}
					showName={showName}
					setIconRef={setIconRef}
				/>
			))}
		</Stack>
	);
}
