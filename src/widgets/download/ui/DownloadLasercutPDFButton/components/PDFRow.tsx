import type { IEqualLayoutBleed } from "@/shared/model/types/layouts";
import { View, type ViewProps } from "@react-pdf/renderer";
import type { PropsWithChildren } from "react";
import type { Style } from "../types";

export type PDFRowProps = PropsWithChildren &
	ViewProps & {
		bleed?: IEqualLayoutBleed;
	};

const style: Style = {
	display: "flex",
	flexDirection: "row",
	flexWrap: "nowrap",
	position: "relative",
	zIndex: -1,
};

export const PDFRow = (props: PDFRowProps) => {
	// const styles
	return <View {...props} style={style} />;
};
