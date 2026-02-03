export const getCheckboxButtonStyles = ({
	checked,
	hover,
}: {
	checked: boolean;
	hover: boolean;
}) => {
	if (!hover) {
		return {
			backgroundColor: checked ? "primary.main" : "transparent",
			color: checked ? "primary.contrastText" : "text.secondary",
		};
	}

	return {
		backgroundColor: checked ? "rgb(248 185 28)" : "action.hover",
		color: checked ? "primary.contrastText" : "text.primary",
	};
};
