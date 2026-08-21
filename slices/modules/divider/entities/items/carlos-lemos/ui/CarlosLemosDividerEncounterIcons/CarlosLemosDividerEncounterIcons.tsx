import { Box, type BoxProps } from "@mui/material";
import { useCallback } from "react";
import { useIconSelection } from "@/modules/core/icon/entities/lib";
import type { Icon as IconType } from "@/modules/core/icon/shared/model";
import { Icon } from "@/modules/core/icon/shared/ui";
import { useDividerContext } from "@/modules/divider/entities/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { Row } from "@/shared/ui";
import {
	getCarlosLemosEncounterIcons,
	useCarlosLemosEncounterIcons,
} from "../../lib";
import type { CarlosLemosDividerParams } from "../../model";
import * as C from "./CarlosLemosDividerEncounterIcons.components";
import * as S from "./CarlosLemosDividerEncounterIcons.styles";

type CarlosLemosDividerEncounterIconsProps = BoxProps;

export function CarlosLemosDividerEncounterIcons(
	props: CarlosLemosDividerEncounterIconsProps,
) {
	const divider = useDividerContext<CarlosLemosDividerParams>();

	const { addIcon, removeIcon } = useCarlosLemosEncounterIcons(divider);
	const getPrintSx = usePrintSx();
	const containerSx = getPrintSx(S.getContainerSx);
	const iconRowContentSx = getPrintSx(S.getIconRowContentSx);
	const addIconSx = getPrintSx(S.getAddIconSx);

	const encounterIcons = getCarlosLemosEncounterIcons(divider);

	const getIconKey = (icon: IconType, index: number) => `${icon}-${index}`;
	const canAddIcon = encounterIcons.length < 6;

	const onIconSelected = useCallback(
		(icon: IconType | null) => {
			if (!icon) {
				return;
			}
			addIcon(icon);
		},
		[addIcon],
	);

	const selectIcon = useIconSelection();

	const select = useCallback(() => {
		selectIcon({
			onSelected: onIconSelected,
		});
	}, [selectIcon, onIconSelected]);

	const isEditable =
		encounterIcons.length > 1 || encounterIcons[0] !== divider.icon;

	return (
		<Box {...props}>
			<Row sx={containerSx}>
				<Box sx={iconRowContentSx}>
					{encounterIcons.map((icon, index) => (
						<C.Icon
							key={getIconKey(icon, index)}
							icon={icon}
							dividerId={divider.id}
							onClick={() => removeIcon(icon)}
							editable={isEditable}
						/>
					))}
					<NotExportable>
						{canAddIcon && (
							<Box sx={addIconSx} onClick={select} displayPrint="none">
								<Icon icon="arkham-plus" />
							</Box>
						)}
					</NotExportable>
				</Box>
			</Row>
		</Box>
	);
}
