import { Box, type BoxProps, type SxProps } from "@mui/material";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import type { Faction } from "@/modules/faction/shared/model";
import { usePrintSx } from "@/modules/print/shared/lib";
import type { Side } from "@/shared/model";
import { Image } from "@/shared/ui";
import {
	investigatorFactionTokensBaseUrl as baseUrl,
	investigatorTokenFrameUrl as frameUrl,
} from "../../config/common";
import { InvestigatorTokenCircleFrame } from "../InvestigatorTokenCircleFrame";
import * as S from "./InvestigatorTokenFrame.styles";
import { positionManifest } from "./positionManifest";

type InvestigatorTokenFrameProps = BoxProps & {
	src: string;
	faction: Faction;
	side: Side;
	backgroundImageSx: SxProps;
};

const angles = [0, 90, 180, 270];
const uniqueIconAngles = [45, 135, 225, 315];

const factionIconColors = ["#f0d878", "#c8a427", "#f0d878", "#c8a427"];

export function InvestigatorTokenFrame({
	src,
	faction,
	backgroundImageSx,
	...props
}: InvestigatorTokenFrameProps) {
	const factionImage = `${baseUrl}/${faction}.avif`;

	const getPrintSx = usePrintSx();
	const imageSx = getPrintSx(S.imageSx);
	const imageContainerSx = getPrintSx(S.imageContainerSx);
	const outerBorderSx = getPrintSx(S.outerBorderSx);
	const factionImageSx = getPrintSx(S.factionImageSx);
	const factionBorderSx = getPrintSx(S.factionBorderSx);
	const frameSx = getPrintSx(S.frameSx);
	const factionIconSx = getPrintSx(S.factionIconSx);
	const uniqueIconSx = getPrintSx(S.uniqueIconSx);
	const factionIconContainerSx = getPrintSx(S.getFactionIconContainerSx);

	const tokenImageSx = {
		...backgroundImageSx,
		...imageSx,
	};

	return (
		<Box {...props}>
			<Box sx={outerBorderSx}>
				<Image src={factionImage} sx={factionImageSx} />
				<Box sx={factionBorderSx} />
			</Box>
			<Box sx={imageContainerSx}>
				<Box
					sx={{
						position: "absolute",
						inset: 0,
						borderRadius: "50%",
						overflow: "hidden",
					}}
				>
					<Image src={src} sx={tokenImageSx} crossOrigin="anonymous" />
				</Box>
				<Image src={frameUrl} sx={frameSx} />
				<Box
					sx={{
						position: "absolute",
						zIndex: 2,
						inset: 0,
						borderRadius: "50%",
						background:
							"radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.9) 100%)",
					}}
				></Box>
			</Box>
			<InvestigatorTokenCircleFrame />
			{angles.map((angle, index) => (
				<Box
					key={`faction-${angle}`}
					sx={{ ...factionIconContainerSx, transform: `rotate(${angle}deg)` }}
				>
					<Icon
						icon={faction}
						sx={factionIconSx}
						manifest={positionManifest}
						color={factionIconColors[index]}
					/>
				</Box>
			))}
			{uniqueIconAngles.map((angle) => (
				<Box
					key={`unique-${angle}`}
					sx={{ ...factionIconContainerSx, transform: `rotate(${angle}deg)` }}
				>
					<Icon icon="unique" sx={uniqueIconSx} />
				</Box>
			))}
		</Box>
	);
}
