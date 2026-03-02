import { Box, type BoxProps, Stack } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { Row } from "@/shared/ui";
import type { IconGroup } from "../../model";
import { IconSelectionItem } from "../IconSelectionItem/IconSelectionItem";
import * as C from "./IconSelectionGroup.components";

type IconSelectionGroupProps = BoxProps & {
	group: IconGroup;
	onHeaderClick: () => void;
	onGroupHeaderClick?: (index: number) => void;
};

export function IconSelectionGroup({
	group,
	onHeaderClick,
	onGroupHeaderClick,
	...props
}: IconSelectionGroupProps) {
	const { t } = useTranslation();

	const handleGroupHeaderClick = useCallback(
		(index: number) => () => {
			onGroupHeaderClick?.(index);
		},
		[onGroupHeaderClick],
	);

	return (
		<Box {...props}>
			<Stack gap={1}>
				<C.Header
					onClick={onHeaderClick}
					sx={{
						fontSize: { xs: 18, sm: 24 },
					}}
				>
					{t(group.name)}
				</C.Header>
				{group.groups.map((group, index) => (
					<Stack key={`${group.id}-${index}`} gap={1}>
						{group.name && (
							<C.GroupHeader onClick={handleGroupHeaderClick(index)}>
								{group.icon && (
									<C.GroupIcon>
										<Icon icon={group.icon} />
									</C.GroupIcon>
								)}
								{t(group.name)}
							</C.GroupHeader>
						)}
						<Row
							flexWrap="wrap"
							gap={1}
							sx={{
								justifyContent: {
									xs: "center",
									md: "flex-start",
								},
							}}
						>
							{group.icons.map((icon) => (
								<IconSelectionItem key={`${group.id}-${icon}`} icon={icon} />
							))}
						</Row>
					</Stack>
				))}
			</Stack>
		</Box>
	);
}
