// import * as C from "./ArkhamIndexDivider.components";

import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerContent as Content,
} from "@/modules/divider/entities/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Image } from "@/shared/ui";
import { arkhamIndexDividerBaseUrl } from "../../config";
import { useArkhamIndexDividerSxOptions } from "../../lib/hooks";
import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerProps,
} from "../../model";
import { ArkhamIndexContext } from "../ArkhamIndexContext";
import * as S from "./ArkhamIndexDivider.styles";

export function ArkhamIndexDivider(props: ArkhamIndexDividerProps) {
	const layout = useAppSelector(selectLayout) as ArkhamIndexDividerLayout;
	const getPrintSx = usePrintSx();
	const sxOptions = useArkhamIndexDividerSxOptions();

	const backgroundSx = getPrintSx(S.getBackgroundSx);
	return (
		<ArkhamIndexContext.Provider value={{ layout, divider: props, sxOptions }}>
			<Container>
				<BleedView>
					<Image
						src={`${arkhamIndexDividerBaseUrl}/background.avif`}
						sx={backgroundSx}
					/>
				</BleedView>
				<Content hideBorderRadius></Content>
			</Container>
		</ArkhamIndexContext.Provider>
	);
}
