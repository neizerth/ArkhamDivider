import Box from "@mui/material/Box";
import {
	DividerBackground as Background,
	DividerContainer as Container,
	DividerContent as Content,
	DividerMenu,
} from "@/modules/divider/entities/ui";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { useCornerRadius, usePrintUnit } from "@/modules/print/shared/lib";
import { InvesigatorTokensAPI } from "@/shared/api";
import * as S from "./InvestigatorToken.styles";

export function InvestigatorToken(props: DividerWithRelations) {
	const getPrintSx = usePrintUnit();
	const borderRadius = useCornerRadius();

	if (props.layoutType !== "investigator") {
		console.log("not investigator");
		return null;
	}
	const { side } = props;
	const { code } = props.investigator;
	const src = InvesigatorTokensAPI.getImageByCode(code);

	const menuSx = getPrintSx(S.getMenuSx);
	const containerSx = getPrintSx(S.containerSx);
	const backgroundSx = getPrintSx(S.backgroundSx, { side });

	const outlineStyle = borderRadius ? "solid" : "none";

	return (
		<Container>
			<Background src={src} sx={backgroundSx} />
			<Box sx={containerSx}>
				<Content sx={{ borderRadius: "50%", outlineStyle }}>
					<DividerMenu dividerId={props.id} sx={menuSx} />
				</Content>
			</Box>
		</Container>
	);
}
