import { arkhamDecoCategory } from "@/shared/data/layouts/arkham-deco";
import { vintageLayoutCategory } from "@/shared/data/layouts/vintage";
import { ArkhamDecoPDFGuides } from "./layouts/ArkhamDecoPDFGuides";
import { VintagePDFGuides } from "./layouts/VintagePDFGuides";

export const COMPONENT_MAP = {
	[arkhamDecoCategory.id]: ArkhamDecoPDFGuides,
	[vintageLayoutCategory.id]: VintagePDFGuides,
};
