import type { DividerLayoutType } from "@/modules/divider/shared/model";
import { prefix } from "@/shared/util";
import { rynoDividerAssetsBaseUrl } from "../../../config";

const asset = prefix(rynoDividerAssetsBaseUrl);

type Options = {
	layoutId: string;
	layoutType: DividerLayoutType;
};

export const getRynoDividerImages = (options: Options) => {
	const { layoutId, layoutType } = options;

	const layoutMap: Record<string, string> = {
		ryno: "horizontal",
		"ryno-vertical": "vertical",
		"ryno-vertical-xl": "vertical-xl",
	};

	const id = layoutMap[layoutId] ?? layoutMap.ryno;

	const typePrefix = layoutType === "player" ? "player-" : "";
	const scenarioPrefix = layoutType === "scenario" ? "" : "player-";

	return {
		body: asset`/body_${id}.avif`,
		header: asset`/header_${scenarioPrefix}${id}.avif`,
		corner: asset`/corner_${typePrefix}${id}.avif`,
	};
};
