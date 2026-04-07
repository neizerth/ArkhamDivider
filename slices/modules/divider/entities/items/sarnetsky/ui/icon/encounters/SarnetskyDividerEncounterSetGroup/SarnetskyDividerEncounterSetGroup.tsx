import { Box } from "@mui/material";
import { Icon } from "@/modules/core/icon/shared/ui";
import {
	type DividerIconPositionsCallback,
	useDividerRender,
} from "@/modules/divider/entities/lib";
import type { EncounterSetGroup } from "@/modules/encounterSet/shared/model";
import { usePrintUnit } from "@/modules/print/shared/lib";

import { Row, type RowProps } from "@/shared/ui";
import { useSarnetskyDividerContext } from "../../../SarnetskyDividerContext";
import * as S from "./SarnetskyDividerEncounterSetGroup.styles";

type SarnetskyDividerEncounterSetGroupProps = RowProps & {
	showName?: boolean;
	groupName: string;
	group: EncounterSetGroup;
	setIconRef?: DividerIconPositionsCallback;
};

export function SarnetskyDividerEncounterSetGroup({
	group,
	groupName,
	showName,
	setIconRef,
	...props
}: SarnetskyDividerEncounterSetGroupProps) {
	const { sxOptions, divider } = useSarnetskyDividerContext();

	const hideIcons = useDividerRender({
		dividerId: divider.id,
		renderType: "pdf",
	});

	const mainSize = group.main.length;
	const sideSize = group.side.length;

	const getPrintSx = usePrintUnit({
		...sxOptions,
		mainSize,
		sideSize,
		hideIcons,
	});

	const sxProp = getPrintSx(S.getContainerSx);
	const iconSx = getPrintSx(S.getIconSx);
	const listSx = getPrintSx(S.getListSx);
	const groupNameSx = getPrintSx(S.getGroupNameSx);
	const listContainerSx = getPrintSx(S.getListContainerSx);
	const horizontalSeparatorSx = getPrintSx(S.getHorizontalSeparatorSx);
	const verticalSeparatorSx = getPrintSx(S.getVerticalSeparatorSx);

	const sx = {
		...sxProp,
		...props.sx,
	};

	return (
		<Row {...props} sx={sx}>
			{showName && <Box sx={groupNameSx}>{groupName}:</Box>}
			<Row sx={listContainerSx}>
				{group.main.length > 0 && (
					<Row sx={listSx}>
						{group.main.map((encounter) => (
							<Icon
								key={encounter}
								icon={encounter}
								sx={iconSx}
								ref={setIconRef?.({
									icon: encounter,
									id: `${group.id}-main-${encounter}`,
								})}
							/>
						))}

						<Box sx={verticalSeparatorSx} />

						<Box sx={verticalSeparatorSx} />
					</Row>
				)}
				<Box sx={horizontalSeparatorSx} />
				{group.side.length > 0 && (
					<Row sx={listSx}>
						{group.side.map((encounter) => (
							<Icon
								key={encounter}
								icon={encounter}
								sx={iconSx}
								ref={setIconRef?.({
									icon: encounter,
									id: `${group.id}-side-${encounter}`,
								})}
							/>
						))}
					</Row>
				)}
			</Row>
		</Row>
	);
}
