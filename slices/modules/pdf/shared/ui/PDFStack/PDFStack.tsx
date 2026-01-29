import { View } from "@react-pdf/renderer";
import type { ComponentProps } from "react";
import { getPDFStyles } from "../../lib";

type PDFStackProps = ComponentProps<typeof View>;

export const PDFStack = (props: PDFStackProps) => {
	const styles = getPDFStyles(props.style);

	return (
		<View
			{...props}
			style={[{ display: "flex", flexDirection: "column" }, ...styles]}
		/>
	);
};
