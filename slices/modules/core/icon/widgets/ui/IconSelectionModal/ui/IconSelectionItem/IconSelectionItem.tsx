import { memo, useCallback } from "react";
import { Icon, useIconSelectionContext } from "@/modules/core/icon/shared/ui";
import * as C from "./IconSelectionItem.components";
import { getIconStyles } from "./IconSelectionItem.styles";

type IconSelectionItemProps = {
	icon: string;
};

const IconSelectionItemComponent = ({ icon }: IconSelectionItemProps) => {
	const { selectedIcon, setSelectedIcon } = useIconSelectionContext();
	const isSelected = selectedIcon === icon;

	const sx = getIconStyles(isSelected);

	const selectIcon = useCallback(() => {
		setSelectedIcon(icon);
	}, [icon, setSelectedIcon]);

	return (
		<C.Icon title={icon} sx={sx} onClick={selectIcon}>
			<Icon icon={icon} />
		</C.Icon>
	);
};

export const IconSelectionItem = memo(IconSelectionItemComponent);
