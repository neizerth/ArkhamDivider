import { useRef } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerContainer as Container,
	DividerContent as Content,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { selectScenarioParams } from "@/modules/divider/shared/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { useSarnetskySxOptions } from "../../lib";
import type { SarnetskyDividerProps, SarnetskyLayout } from "../../model";
import {
	SarnetskyDividerBackground as Background,
	SarnetskyDividerScenarioContent as ScenarioContent,
	SarnetskyDividerTitle as Title,
} from "../common";
import { SarnetskyDividerSecondaryIcons as SecondaryIcons } from "../icon";
import { SarnetskyDividerContext } from "../SarnetskyDividerContext";
import { SarnetskyDividerPlayerSubtitle as PlayerSubtitle } from "../subtitle";
import { SarnetskyDividerSideRadialXP as RadialXP } from "../xp";
import { SarnetskyDividerInlineXP as InlineXP } from "../xp/SarnetskyDividerInlineXP";
import * as S from "./SarnetskyDivider.styles";

export function SarnetskyDivider(props: SarnetskyDividerProps) {
	const containerRef = useRef<HTMLElement>(null);

	const layout = useAppSelector(selectLayout) as SarnetskyLayout;

	const { singleSide = false } = useAppSelector(selectScenarioParams);

	const sxOptions = useSarnetskySxOptions(props);
	const getPrintSx = usePrintUnit(sxOptions);
	const sx = getPrintSx(S.getSx);
	const titleSx = getPrintSx(S.getTitleSx);
	const radialXPSx = getPrintSx(S.getRadialXPSx);
	const inlineXPSx = getPrintSx(S.getInlineXPSx);
	const playerSubtitleSx = getPrintSx(S.getPlayerSubtitleSx);
	const scenarioSubtitleSx = getPrintSx(S.getScenarioSubtitleSx);
	const scenarioContentSx = getPrintSx(S.getScenarioContentSx);
	const menuSx = getPrintSx(S.getMenuSx);

	const { xpCost } = sxOptions;

	const showBlank = singleSide && props.side === "back";

	return (
		<SarnetskyDividerContext.Provider
			value={{
				divider: props,
				sxOptions,
				containerRef,
				layout,
				singleSide,
			}}
		>
			<Container>
				<Background {...props} />
				<Content sx={sx} ref={containerRef}>
					{!showBlank && (
						<>
							<Title sx={titleSx} />
							<SecondaryIcons />
							<ScenarioContent
								sx={scenarioContentSx}
								subtitleSx={scenarioSubtitleSx}
							/>
							{xpCost && (
								<>
									<RadialXP sx={radialXPSx} xpCost={xpCost} />
									<InlineXP sx={inlineXPSx} xpCost={xpCost} />
								</>
							)}
							<PlayerSubtitle sx={playerSubtitleSx} />

							<NotExportable>
								<Menu dividerId={props.id} sx={menuSx} />
							</NotExportable>
						</>
					)}
				</Content>
			</Container>
		</SarnetskyDividerContext.Provider>
	);
}
