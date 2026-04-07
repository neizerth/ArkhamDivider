const mdMin = "@media (min-width:900px)";

export const getCheckboxButtonStyles = ({
	checked,
	hover,
}: {
	checked: boolean;
	hover: boolean;
}) => {
	const base = {
		backgroundColor: checked ? "primary.main" : "transparent",
		color: checked ? "primary.contrastText" : "text.secondary",
	};
	const hoverStyles = {
		backgroundColor: checked ? "rgb(248 185 28)" : "action.hover",
		color: checked ? "primary.contrastText" : "text.primary",
	};

	return {
		...base,
		[mdMin]: hover ? hoverStyles : base,
	};
};
