import type { BoxProps, SxProps } from "@mui/material";
import { usePrintSx } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { getRynoDividerHeaderFilter } from "../../lib";
import { useRynoDividerContext } from "../RynoDividerContext";
import * as S from "./RynoDivider.styles";

export const Header = ({ src, ...props }: BoxProps<"img">) => {
	const { divider } = useRynoDividerContext();
	const getPrintSx = usePrintSx();
	const headerSx = getPrintSx(S.getHeaderSx);

	const filter = getRynoDividerHeaderFilter(divider);
	const sx = {
		...headerSx,
		filter,
	} as SxProps;

	return <Image {...props} src={src} sx={sx} />;
};
