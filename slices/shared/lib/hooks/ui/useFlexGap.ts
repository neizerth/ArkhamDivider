import { useTheme } from "@mui/material/styles";

export function useFlexGap(spacing: number) {
	const theme = useTheme();
	return (columns: number) => {
		const gap = theme.spacing(spacing * (columns - 1));

		return `calc((100% - ${gap}) / ${columns})`;
	};
}
