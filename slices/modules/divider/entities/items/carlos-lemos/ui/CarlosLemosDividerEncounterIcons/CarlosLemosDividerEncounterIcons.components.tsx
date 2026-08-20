import { Box, type BoxProps } from "@mui/material";
import { useMemo } from "react";
import type { Icon as IconType } from "@/modules/core/icon/shared/model";
import { DividerIcon } from "@/modules/divider/features/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { carlosLemosBaseUrl } from "../../config";
import { carlosLemosObjects as O } from "../../config/objects";
import * as S from "./CarlosLemosDividerEncounterIcons.styles";

const asset = prefix(carlosLemosBaseUrl);

export const Icon = ({
	icon,
	dividerId,
	onClick,
	editable,
}: BoxProps & {
	icon: IconType;
	dividerId: string;
	editable: boolean;
}) => {
	const options = useMemo(() => ({ editable }), [editable]);

	const getPrintSx = usePrintSx(options);
	const containerSx = getPrintSx(S.getIconContainerSx);
	const iconSx = getPrintSx(S.getIconSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);

	const backgroundImage = asset(`/icon.avif`);

	return (
		<Box sx={containerSx} onClick={onClick}>
			<DividerIcon
				icon={icon}
				sx={iconSx}
				dividerId={dividerId}
				{...O.icon.params}
			/>
			<Image src={backgroundImage} sx={backgroundSx} />
		</Box>
	);
};
