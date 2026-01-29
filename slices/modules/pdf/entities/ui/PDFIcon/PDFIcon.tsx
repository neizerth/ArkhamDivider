import { Text, type TextProps } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/stylesheet";
import { defaultIconPositionManifest } from "@/modules/core/icon/shared/config";
import {
	getIconCorrection,
	getIconScale,
} from "@/modules/core/icon/shared/lib";
import type {
	BaseIconProps,
	Icon,
	IconPositionManifest,
} from "@/modules/core/icon/shared/model";
import { getPDFStyles } from "@/modules/pdf/shared/lib";

type PDFIconProps = TextProps &
	BaseIconProps & {
		manifest?: IconPositionManifest;
		icon?: Icon;
		fontSize: number;
		left?: number;
		right?: number;
		top?: number;
		bottom?: number;
	};
export function PDFIcon(props: PDFIconProps) {
	const {
		manifest = defaultIconPositionManifest,
		icon,
		scaleType,
		scaleFactor,
		left,
		right,
		top,
		bottom,
	} = props;

	if (!icon) {
		return null;
	}

	const size = getIconScale({
		scaleType,
		scaleFactor,
		ratio: icon?.ratio,
		circled: icon?.circled,
	});

	const correction = getIconCorrection({
		icon: icon.icon,
		manifest,
		fontSize: props.fontSize,
	});
	const fontSize = correction.fontSize * size;

	const styleProp = getPDFStyles(props.style);

	const styles: Style[] = [
		...styleProp,
		{
			fontFamily: "ArkhamIcons",
			fontSize,
			...(left && { left: left + correction.left }),
			...(right && { right: right - correction.left }),
			...(top && { top: top + correction.top }),
			...(bottom && { bottom: bottom - correction.top }),
		},
	];

	const char = String.fromCharCode(icon.code);

	return (
		<Text {...props} style={styles}>
			{char}
		</Text>
	);
}
