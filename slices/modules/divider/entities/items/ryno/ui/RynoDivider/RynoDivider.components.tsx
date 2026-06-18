import type { BoxProps } from "@mui/material";
import { useId } from "react";
import { usePrintSx } from "@/modules/print/shared/lib";
import { isFirefox } from "@/shared/config";
import { Image } from "@/shared/ui";
import { SVGFilter } from "@/shared/ui/style";
import { stringifyCSSFilters } from "@/shared/util";
import { getRynoDividerHeaderFilter } from "../../lib";
import { useRynoDividerContext } from "../RynoDividerContext";
import * as S from "./RynoDivider.styles";

export const Header = ({ src, ...props }: BoxProps<"img">) => {
	const { divider } = useRynoDividerContext();
	const getPrintSx = usePrintSx();
	const headerSx = getPrintSx(S.getHeaderSx);
	const headerId = useId();

	const filters = getRynoDividerHeaderFilter(divider);
	if (isFirefox) {
		const filterId = `header-filter-${headerId}`;
		return (
			<>
				<SVGFilter filterId={filterId} filters={filters} />
				<Image
					{...props}
					src={src}
					sx={{ ...headerSx, filter: `url(#${filterId})` }}
				/>
			</>
		);
	}
	const cssFilter = stringifyCSSFilters(filters);

	return <Image {...props} src={src} sx={{ ...headerSx, filter: cssFilter }} />;
};
