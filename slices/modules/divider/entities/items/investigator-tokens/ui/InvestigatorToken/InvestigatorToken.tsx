import Box from "@mui/material/Box";
import { useMemo } from "react";
import {
	DividerBackground as Background,
	DividerContainer as Container,
	DividerContent as Content,
	DividerMenu,
} from "@/modules/divider/entities/ui";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { useCornerRadius, usePrintSx } from "@/modules/print/shared/lib";
import { InvesigatorTokensAPI } from "@/shared/api";
import * as S from "./InvestigatorToken.styles";

export function InvestigatorToken(props: DividerWithRelations) {
	const borderRadius = useCornerRadius();

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
	const { code } = props.investigator;
	const src = InvesigatorTokensAPI.getImageByCode(code);

	const menuSx = getPrintSx(S.getMenuSx);
	const containerSx = getPrintSx(S.containerSx);
	const backgroundSx = getPrintSx(S.backgroundSx);

	const outlineStyle = borderRadius ? "solid" : "none";

	return (
		<Container>
			<Background src={src} sx={backgroundSx} />

			{side === "front" && (
				<Content sx={{ borderRadius: "50%", outlineStyle }} side="front" />
			)}
			<Box sx={containerSx}>
				<Content hideBorderRadius side={side}>
					<DividerMenu dividerId={props.id} sx={menuSx} />
				</Content>
			</Box>
		</Container>
	);
}

export default InvestigatorToken;
