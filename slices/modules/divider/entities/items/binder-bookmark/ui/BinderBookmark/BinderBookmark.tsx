// import * as C from "./BinderBookmark.components";

import {
	DividerBleedView,
	DividerContainer,
} from "@/modules/divider/entities/ui";
import { getDividerFaction } from "@/modules/divider/shared/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { binderBookmarkBaseUrl } from "../../config";
import type { BinderBookmarkProps } from "../../model";
import * as S from "./BinderBookmark.styles";

export function BinderBookmark(props: BinderBookmarkProps) {
	const faction = getDividerFaction(props);

	const getPrintSx = usePrintUnit();
	const backgroundSx = getPrintSx(S.getBackgroundSx);

	return (
		<DividerContainer>
			{faction && (
				<DividerBleedView>
					<Image
						src={`${binderBookmarkBaseUrl}/${faction}.avif`}
						sx={backgroundSx}
					/>
				</DividerBleedView>
			)}
		</DividerContainer>
	);
}
