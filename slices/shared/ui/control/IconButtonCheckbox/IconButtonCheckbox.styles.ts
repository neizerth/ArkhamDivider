const mdMin = "@media (min-width:900px)";

export const getIconButtonCheckboxStyles = ({
	checked,
	hover,
}: {
	checked: boolean;
	hover: boolean;
}) => {
	const base = {
		backgroundColor: checked ? "primary.main" : "transparent",
		color: checked ? "black" : "default",
	};
	const hoverStyles = {
		backgroundColor: checked ? "rgb(248 185 28)" : "primary.light",
		color: checked ? "primary.light" : "inherit",
	};

	return {
		...base,
		[mdMin]: hover ? hoverStyles : base,
	};
};
