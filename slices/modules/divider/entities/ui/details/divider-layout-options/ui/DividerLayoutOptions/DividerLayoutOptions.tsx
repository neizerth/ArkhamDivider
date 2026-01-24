import type { BoxProps } from "@mui/material/Box";
import type { FC } from "react";
import { selectDividerType } from "@/modules/divider/shared/lib";
import type { DividerLayoutType } from "@/modules/divider/shared/model";
import { useAppSelector } from "@/shared/lib";
import { InvestigatorDividerOptions } from "../InvestigatorDividerOptions";
import { PlayerDividerOptions } from "../PlayerDividerOptions";
import { ScenarioDividerOptions } from "../scenario-divider-options";

type DividerLayoutOptionsProps = BoxProps;

const dividerTypeMap: Record<DividerLayoutType, FC<BoxProps>> = {
	scenario: ScenarioDividerOptions,
	player: PlayerDividerOptions,
	investigator: InvestigatorDividerOptions,
};

export function DividerLayoutOptions(props: DividerLayoutOptionsProps) {
	const dividerType = useAppSelector(selectDividerType);
	const Component = dividerTypeMap[dividerType];
	return <Component {...props} />;
}
