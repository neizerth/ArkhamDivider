import {
	arkhamDecoChapter2Objects,
	arkhamDecoHorizontalObjects,
	arkhamDecoUCF50Objects,
	arkhamDecoUCFStandardObjects,
	arkhamDecoVerticalObjects,
} from "../../../config";

export const getArkhamDecoLayoutObjects = (layoutId: string) => {
	if (layoutId === "ucf-standard") {
		return arkhamDecoUCFStandardObjects;
	}
	if (layoutId === "ucf-50") {
		return arkhamDecoUCF50Objects;
	}
	if (layoutId === "chapter2") {
		return arkhamDecoChapter2Objects;
	}
	if (layoutId === "vertical") {
		return arkhamDecoVerticalObjects;
	}
	return arkhamDecoHorizontalObjects;
};
