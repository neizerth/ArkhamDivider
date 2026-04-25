// import * as C from "./ArkhamIndexDivider.components";

import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerContent as Content,
} from "@/modules/divider/entities/ui";
import { selectDividerTabIndex } from "@/modules/divider/shared/lib";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Image } from "@/shared/ui";
import { arkhamIndexDividerBaseUrl } from "../../config";
import { useArkhamIndexDividerSxOptions } from "../../lib/hooks";
import { getArkhamIndexDividerTabSize } from "../../lib/logic";
import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerProps,
} from "../../model";
import { ArkhamIndexContext } from "../ArkhamIndexContext";
import { ArkhamIndexDividerBorder as BackgroundStroke } from "../ArkhamIndexDividerBorder";
import { ArkhamIndexDividerTab as Tab } from "../tab";
import * as S from "./ArkhamIndexDivider.styles";

export function ArkhamIndexDivider(props: ArkhamIndexDividerProps) {
	const layout = useAppSelector(selectLayout) as ArkhamIndexDividerLayout;

	const tabIndex = useAppSelector(
		selectDividerTabIndex({ id: props.id, tabsCount: 3, side: props.side }),
	);

	const tabSize = getArkhamIndexDividerTabSize(props);

	const getPrintSx = usePrintSx();
	const sxOptions = useArkhamIndexDividerSxOptions({
		divider: props,
		tabIndex,
		tabSize,
	});
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const backgroundStrokeSx = getPrintSx(S.getBackgroundStrokeSx);

	return (
		<ArkhamIndexContext.Provider
			value={{ layout, divider: props, tabSize, tabIndex, sxOptions }}
		>
			<Container>
				<BleedView>
					<Image
						src={`${arkhamIndexDividerBaseUrl}/background.avif`}
						sx={backgroundSx}
					/>
				</BleedView>
				<Content hideBorderRadius>
					<BackgroundStroke sx={backgroundStrokeSx} />
					<Tab />
				</Content>
			</Container>
		</ArkhamIndexContext.Provider>
	);
}

export default ArkhamIndexDivider;
