import { Font } from "@react-pdf/renderer";
import { useEffect } from "react";
import { fonts } from "../../config";

export function usePDFFont(fontFamily: keyof typeof fonts) {
	useEffect(() => {
		const config = fonts[fontFamily];
		Font.register(config);
	}, [fontFamily]);
}
