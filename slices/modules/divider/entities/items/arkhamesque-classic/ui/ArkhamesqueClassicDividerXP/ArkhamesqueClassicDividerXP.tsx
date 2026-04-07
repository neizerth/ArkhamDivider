import { Box, type BoxProps } from "@mui/material";
import type { XPCost } from "@/modules/divider/shared/model";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { getArkhamesqueClassicXPSymbols } from "../../lib";
import * as S from "./ArkhamesqueClassicDividerXP.styles";

export type ArkhamesqueClassicDividerXPProps = BoxProps & {
	xpCost: XPCost;
};

export function ArkhamesqueClassicDividerXP({
	xpCost,
	...props
}: ArkhamesqueClassicDividerXPProps) {
	const getPrint = usePrintUnit();

	const { container, symbols } = getArkhamesqueClassicXPSymbols(xpCost);
	const containerSx = getPrint(S.getContainerSx, container);

	return (
		<Box
			{...props}
			component="span"
			sx={[containerSx, props.sx].filter(Boolean) as never}
		>
			{symbols.map((symbol, idx) => (
				<Box
					// stable enough: sequence depends on xpCost
					key={`${idx}-${symbol.char}`}
					component="span"
					sx={getPrint(S.getSymbolSx, symbol)}
				>
					{symbol.char}
				</Box>
			))}
		</Box>
	);
}
