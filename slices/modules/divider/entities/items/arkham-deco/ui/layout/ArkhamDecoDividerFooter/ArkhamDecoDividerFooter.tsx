import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { arkhamDecoAssetUrl } from "../../../config";
import * as C from "./ArkhamDecoDividerFooter.components";
import * as S from "./ArkhamDecoDividerFooter.styles";

const asset = prefix(arkhamDecoAssetUrl);

export function ArkhamDecoDividerFooter() {
	const getPrintSx = usePrintUnit();
	const lineSx = getPrintSx(S.getBottomLineSx);

	return (
		<>
			<C.Corner position="left" />
			<C.Corner position="right" />
			<Image src={asset("/bottom-line.svg")} sx={lineSx} />
		</>
	);
}
