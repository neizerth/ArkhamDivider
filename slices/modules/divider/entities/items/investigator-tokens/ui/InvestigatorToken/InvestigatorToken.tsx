import Box from "@mui/material/Box";
import { useMemo } from "react";
import {
	DividerBackground as Background,
	DividerContainer as Container,
	DividerContent as Content,
	DividerMenu,
} from "@/modules/divider/entities/ui";
import { selectLayoutId } from "@/modules/divider/shared/lib";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { useCornerRadius, usePrintSx } from "@/modules/print/shared/lib";
import { InvesigatorTokensAPI } from "@/shared/api";
import { useAppSelector } from "@/shared/lib";
import { investigatorTokenFrameUrl as frameUrl } from "../../config/common";
import { isInvestigatorTokenFactionLayout } from "../../lib";
import { InvestigatorTokenFrame as Frame } from "../InvestigatorTokenFrame";
import * as S from "./InvestigatorToken.styles";

export function InvestigatorToken(props: DividerWithRelations) {
	const borderRadius = useCornerRadius();
	const layoutId = useAppSelector(selectLayoutId) as string;
	const isFactionLayout = isInvestigatorTokenFactionLayout(layoutId);

	const { side } = props;
	const sxProps = useMemo(
		() => ({
			side,
		}),
		[side],
	);

	const getPrintSx = usePrintSx(sxProps);

	if (props.layoutType !== "investigator") {
		console.log("not investigator");
		return null;
	}
	const { faction } = props;
	const { code } = props.investigator;
	const backgroundImage = InvesigatorTokensAPI.getImageByCode(code);

	const menuSx = getPrintSx(S.getMenuSx);
	const containerSx = getPrintSx(S.containerSx);
	const backgroundImageSx = getPrintSx(S.backgroundImageSx);
	const frameSx = getPrintSx(S.frameSx);
	const frameBackgroundSx = getPrintSx(S.frameBackgroundSx);
	const outlineStyle = borderRadius && side === "front" ? "solid" : "none";

	return (
		<Container>
			{isFactionLayout ? (
				<Background src={frameUrl} sx={frameBackgroundSx} />
			) : (
				<Background src={backgroundImage} sx={backgroundImageSx} />
			)}

			<Content
				sx={{ borderRadius: "50%", outlineStyle }}
				hideBorderRadius={side === "back"}
				side={side}
			>
				{isFactionLayout && (
					<Frame
						src={backgroundImage}
						sx={frameSx}
						faction={faction}
						side={side}
						backgroundImageSx={backgroundImageSx}
					/>
				)}
			</Content>
			<Box sx={containerSx}>
				<Content hideBorderRadius side={side}>
					<DividerMenu dividerId={props.id} sx={menuSx} />
				</Content>
			</Box>
		</Container>
	);
}

export default InvestigatorToken;
