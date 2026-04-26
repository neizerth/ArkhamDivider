import type { BoxProps } from "@mui/material";
import { DividerContent } from "@/modules/divider/entities/ui";

export const Layer = (props: BoxProps) => {
	return <DividerContent {...props} hideBorderRadius />;
};
