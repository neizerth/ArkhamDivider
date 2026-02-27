import { Box, type BoxProps, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { Row } from "@/shared/ui";
import type { IconGroup } from "../../model";
import { IconSelectionItem } from "../IconSelectionItem/IconSelectionItem";
import * as C from "./IconSelectionGroup.components";

type IconSelectionGroupProps = BoxProps & {
	group: IconGroup;
};

export function IconSelectionGroup({
	group,
	...props
}: IconSelectionGroupProps) {
	const { t } = useTranslation();

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
