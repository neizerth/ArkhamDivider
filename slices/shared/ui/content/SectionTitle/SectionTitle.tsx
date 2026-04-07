import Divider from "@mui/material/Divider";
import Typography, { type TypographyProps } from "@mui/material/Typography";

export function SectionTitle({ variant = "h5", ...props }: TypographyProps) {
	return (
		<Divider component="div" role="presentation" sx={{ paddingBottom: 2 }}>
			<Typography {...props} variant={variant} />
		</Divider>
	);
}
