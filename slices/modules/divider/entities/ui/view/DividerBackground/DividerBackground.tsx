import type { SxProps } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import { Image } from "@/shared/ui";
import { DividerBleedView } from "../DividerBleedView";

type DividerBackgroundProps = Omit<BoxProps<"img">, "component"> & {
	imageSx?: SxProps;
};

export function DividerBackground({
	src,
	imageSx,
	...props
}: DividerBackgroundProps) {
	return (
		<DividerBleedView {...props}>
			<Image
				component="img"
				src={src}
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: "100%",
					height: "100%",
					...imageSx,
				}}
				crossOrigin="anonymous"
			/>
		</DividerBleedView>
	);
}
