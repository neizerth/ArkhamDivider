import { Box, type BoxProps } from "@mui/material";
import { useMemo } from "react";
import type { DividerSubtype } from "@/modules/divider/shared/model";
import type { Faction } from "@/modules/faction/shared/model";

type SarnetskyDividerPlayerBackgroundProps = BoxProps & {
	faction: Faction;
	subtype?: DividerSubtype | null;
};

export function SarnetskyDividerPlayerBackground({
	faction,
	subtype,
	sx,
}: SarnetskyDividerPlayerBackgroundProps) {
	const id = useMemo(() => {
		switch (subtype) {
			case "weakness":
			case "basic_weakness":
				return "weakness";
			case "customizations":
				return "customizations";
			default:
				return faction;
		}
	}, [faction, subtype]);

	const src = `/images/divider/background/sarnetsky/horizontal/player/${id}.jpg`;
	return <Box component="img" src={src} sx={sx} />;
}
