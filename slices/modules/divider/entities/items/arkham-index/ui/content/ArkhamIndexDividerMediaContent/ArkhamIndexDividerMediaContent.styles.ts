import { percent, prefix } from "@/shared/util";
import { arkhamIndexDividerBaseUrl } from "../../../config";
import type { ArkhamIndexDividerSxCallback } from "../../../model";

const asset = prefix(arkhamIndexDividerBaseUrl);

export const getTopLineSx: ArkhamIndexDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.topLine.top),
	height: mm(O.topLine.height),
	backgroundImage: `url(${asset("/top-line.avif")})`,
	backgroundSize: "contain",
	backgroundPosition: "center",
	left: mm(-3),
	right: mm(-3),
	bottom: 0,
});

export const getBottomLineSx: ArkhamIndexDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	bottom: mm(O.bottomLine.bottom),
	height: mm(O.bottomLine.height),
	backgroundImage: `url(${asset("/bottom-line.avif")})`,
	backgroundSize: "contain",
	backgroundPosition: "center",
	left: mm(-3),
	right: mm(-3),
});

export const getTitleSx: ArkhamIndexDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.title.top),
	left: mm(O.title.left),
	right: mm(O.title.right),
	height: mm(O.title.height),
});

export const getImageSx: ArkhamIndexDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.topLine.top + O.topLine.height),
	bottom: mm(O.bottomLine.bottom + O.bottomLine.bottomOffset),
	left: mm(-3),
	right: mm(-3),
	overflow: "hidden",
});

export const getCoversCountSx: ArkhamIndexDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	gap: mm(1),
	bottom: mm(3),
	right: mm(6),
});

export const getIconSx: ArkhamIndexDividerSxCallback = ({ mm }) => ({
	fontSize: mm(3),
	color: "white",
	textShadow: `0 0 ${mm(1)} rgba(0, 0, 0, 0.5)`,
	WebkitTextStroke: `${mm(0.1)} rgba(0, 0, 0, 0.3)`,
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getUploadSx: ArkhamIndexDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(3),
	right: mm(5),
	fontSize: mm(3),
	gap: mm(1),

	zIndex: 2,
});
