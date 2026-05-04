// import * as C from "./CarlosLemosDivider.components";

import { Box } from "@mui/material";
import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerContent as Content,
	DividerBackground,
} from "@/modules/divider/entities/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import { absoluteFill } from "@/shared/config";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { carlosLemosBaseUrl } from "../../config";
import type { CarlosLemosDividerParams } from "../../model";
import * as S from "./CarlosLemosDivider.styles";

type CarlosLemosDividerProps = CarlosLemosDividerParams;

const asset = prefix(carlosLemosBaseUrl);

export function CarlosLemosDivider(props: CarlosLemosDividerProps) {
	const getPrintSx = usePrintSx();
	const colorSx = getPrintSx(S.getColorSx);

	return (
		<Container>
			<DividerBackground src={asset("/background.avif")} sx={absoluteFill} />
			<BleedView>
				<Image src={asset("/color.avif")} sx={absoluteFill} />
				<Box sx={colorSx} />
			</BleedView>
			<Content side={props.side}></Content>
		</Container>
	);
}

export default CarlosLemosDivider;
