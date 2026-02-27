import { Box, type BoxProps, Stack } from "@mui/material";
import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Icon, IconSelectionContext } from "@/modules/core/icon/shared/ui";
import { Row } from "@/shared/ui";
import type { IconGroup } from "../../model";
import * as C from "./IconSelectionGroup.components";

type IconSelectionGroupProps = BoxProps & {
	group: IconGroup;
};

export function IconSelectionGroup({
	group,
	...props
}: IconSelectionGroupProps) {
	const { selectedIcon, setSelectedIcon } = useContext(IconSelectionContext);

	const { t } = useTranslation();

	const selectIcon = useCallback(
		(icon: string) => () => {
			setSelectedIcon(icon);
		},
		[setSelectedIcon],
	);

	return (
		<Box {...props}>
			<Stack gap={1}>
				<C.Header>{t(group.name)}</C.Header>
				{group.groups.map((group, index) => (
					<Stack key={`${group.id}-${index}`} gap={1}>
						{group.name && (
							<C.GroupHeader>
								{group.icon && (
									<C.GroupIcon>
										<Icon icon={group.icon} />
									</C.GroupIcon>
								)}
								{t(group.name)}
							</C.GroupHeader>
						)}
						<Row flexWrap="wrap" gap={1}>
							{group.icons.map((icon) => {
								const isSelected = selectedIcon === icon;
								return (
									<C.Icon
										key={`${group.id}-${icon}`}
										title={icon}
										sx={{
											backgroundColor: isSelected
												? "rgb(255, 205, 72)"
												: "rgb(248, 248, 248)",
											"&:hover": {
												border: isSelected ? "none" : "3px solid #e2e2e2",
											},
										}}
										onClick={selectIcon(icon)}
									>
										<Icon icon={icon} />
									</C.Icon>
								);
							})}
						</Row>
					</Stack>
				))}
			</Stack>
		</Box>
	);
}
