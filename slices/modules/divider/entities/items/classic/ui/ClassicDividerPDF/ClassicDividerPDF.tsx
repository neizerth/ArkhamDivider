import { Image, Text, View } from "@react-pdf/renderer";
import { getPDFLocaleStyles, usePDFFont } from "@/modules/pdf/shared/lib";
import { fromPx, mm2px } from "@/modules/print/shared/lib";
import type { DividerRender } from "@/modules/render/shared/model";
import { translateStory } from "@/modules/story/shared/lib";
import { getTextStyles } from "./ClassicDividerPDF.styles";

type ClassicDividerPDFProps = DividerRender;

const getFontFamily = (language: string) => {
	if (language === "ru") {
		return "Conkordia";
	}
	return "Arkhamic";
};

export function ClassicDividerPDF({
	backgroundUrl,
	language,
	dpi,
	bleed,
	story,
	...props
}: ClassicDividerPDFProps) {
	const mmSize = mm2px(1, dpi);
	const mm = fromPx(mmSize);
	const fontFamily = getFontFamily(language);

	usePDFFont(fontFamily);

	const textStyles = getTextStyles(mm);
	const localeTextStyles = getPDFLocaleStyles(textStyles, language);

	const title = translateStory({
		text: props.title,
		story,
	});

	return (
		<View style={{ position: "relative" }}>
			<Image style={{ position: "relative" }} src={backgroundUrl} />
			<View
				style={{
					position: "absolute",
					left: mm(bleed),
					right: mm(bleed),
					bottom: mm(bleed),
					top: mm(bleed),
				}}
			>
				<Text style={localeTextStyles}>{title}</Text>
			</View>
		</View>
	);
}
