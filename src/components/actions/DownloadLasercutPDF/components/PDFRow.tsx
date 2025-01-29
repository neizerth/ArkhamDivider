import { IEqualLayoutBleed } from "@/shared/model/types/layouts";
import { View, ViewProps } from "@react-pdf/renderer";
import { PropsWithChildren } from "react";
import { Style } from "../types";

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
