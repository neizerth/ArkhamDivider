export const getIconButtonCheckboxStyles = ({
	checked,
	hover,
}: {
	checked: boolean;
	hover: boolean;
}) => {
	if (!hover) {
		return {
			backgroundColor: checked ? "primary.main" : "transparent",
			color: checked ? "black" : "default",
		};
	}

	return {
		backgroundColor: checked ? "rgb(248 185 28)" : "primary.light",
		color: checked ? "primary.light" : "inherit",
	};
};
