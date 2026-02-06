import type { Cropmark } from "../../../model";
import { getCropmark } from "./getCropmark";

type Options = {
	grid: {
		cols: number;
		rows: number;
	};
	rowIndex: number;
	colIndex: number;
	bleedEnabled?: boolean;
	hidden?: boolean;
};

export const getGridCropmarks = (options: Options): Cropmark[] => {
	const {
		grid,
		rowIndex,
		colIndex,
		bleedEnabled = false,
		hidden = false,
	} = options;
	if (hidden) {
		return [];
	}
	const { cols, rows } = grid;

	const lastRowIndex = rows - 1;
	const lastColIndex = cols - 1;

	const isFirstRow = rowIndex === 0;
	const isLastRow = rowIndex === lastRowIndex;
	const isFirstCol = colIndex === 0;
	const isLastCol = colIndex === lastColIndex;

	const cropmarks: Cropmark[] = [];

	// horizontal cropmarks

	if (isFirstCol) {
		cropmarks.push(
			getCropmark({
				type: "horizontal",
				position: "topLeft",
			}),
		);
		if (isLastRow || bleedEnabled) {
			cropmarks.push(
				getCropmark({
					type: "horizontal",
					position: "bottomLeft",
				}),
			);
		}
	}
	if (isLastCol) {
		cropmarks.push(
			getCropmark({
				type: "horizontal",
				position: "topRight",
			}),
		);
		if (isLastRow || bleedEnabled) {
			cropmarks.push(
				getCropmark({
					type: "horizontal",
					position: "bottomRight",
				}),
			);
		}
	}

	// vertical cropmarks

	if (isFirstRow) {
		cropmarks.push(
			getCropmark({
				type: "vertical",
				position: "topLeft",
			}),
		);
		if (isLastCol || bleedEnabled) {
			cropmarks.push(
				getCropmark({
					type: "vertical",
					position: "topRight",
				}),
			);
		}
	}

	if (isLastRow) {
		cropmarks.push(
			getCropmark({
				type: "vertical",
				position: "bottomLeft",
			}),
		);
		if (isLastCol || bleedEnabled) {
			cropmarks.push(
				getCropmark({
					type: "vertical",
					position: "bottomRight",
				}),
			);
		}
	}

	return cropmarks;
};
