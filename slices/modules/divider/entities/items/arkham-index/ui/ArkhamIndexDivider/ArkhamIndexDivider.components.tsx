import type { BoxProps } from "@mui/material";
import { DividerContent } from "@/modules/divider/entities/ui";
import type { Side } from "@/shared/model";

type LayerProps = BoxProps & { side: Side };

export const Layer = ({ side, ...props }: LayerProps) => {
	return <DividerContent {...props} hideBorderRadius side={side} />;
};
