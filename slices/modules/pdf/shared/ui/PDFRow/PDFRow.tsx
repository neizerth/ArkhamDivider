import { View } from "@react-pdf/renderer";
import type { ComponentProps } from "react";
import { getPDFStyles } from "../../lib";

type PDFRowProps = ComponentProps<typeof View>;

export const PDFRow = (props: PDFRowProps) => {
	const styles = getPDFStyles(props.style);

	return (
		<View
			{...props}
			style={[{ display: "flex", flexDirection: "row" }, ...styles]}
		/>
	);
};
