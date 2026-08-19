import { Box, type BoxProps } from "@mui/material";
import type { CSSFilter } from "@/shared/model/style";
import { cssFiltersToColorMatrix } from "@/shared/util";

type SVGFilterProps = BoxProps<"svg"> & {
	filterId: string;
	filters: CSSFilter[];
};

export const SVGFilter = ({ filterId, filters, ...props }: SVGFilterProps) => {
	const matrix = cssFiltersToColorMatrix(filters);
	return (
		<Box
			component="svg"
			width="0"
			height="0"
			overflow="hidden"
			position="absolute"
			{...props}
		>
			<filter id={filterId}>
				<feColorMatrix type="matrix" values={matrix} />
			</filter>
		</Box>
	);
};
