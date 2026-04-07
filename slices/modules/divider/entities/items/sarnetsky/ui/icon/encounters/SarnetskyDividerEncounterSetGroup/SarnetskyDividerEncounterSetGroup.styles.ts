import type { PrintSxCallback } from "@/modules/print/shared/model";
import type {
	SarnetskyDividerCallbackProps,
	SarnetskyDividerSxCallback,
} from "../../../../model";

type SxCallback = PrintSxCallback<
	SarnetskyDividerCallbackProps & {
		hideIcons?: boolean;
	}
>;

const separatorSize = 0.1;
const listGap = 4 + separatorSize;

export const getContainerSx: SarnetskyDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	alignItems: "center",
	fontSize: mm(O.encounterIcon.fontSize),
	gap: mm(2),
});

export const getListSx: SarnetskyDividerSxCallback = ({ mm, orientation }) => ({
	position: "relative",
	gap: orientation === "horizontal" ? mm(2) : mm(1.5),
	display: "inline-flex",
	justifyContent: "center",
	alignItems: "center",
	flexGrow: 1,
});

export const getIconSx: SxCallback = ({ hideIcons }) => ({
	textAlign: "center",
	opacity: hideIcons ? 0 : 1,
});

export const getListContainerSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	gap: mm(listGap),
	display: "inline-flex",
	justifyContent: "center",
	alignItems: "center",
	flexWrap: "wrap",
	position: "relative",
	overflow: "hidden",
	margin: "0 auto",
});

export const getHorizontalSeparatorSx: SarnetskyDividerSxCallback = ({
	mm,
}) => ({
	position: "absolute",
	top: `calc(1em + ${mm(listGap / 2)})`,
	left: mm(5),
	right: mm(5),
	height: mm(separatorSize),
	backgroundColor: "black",
});

export const getVerticalSeparatorSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	right: mm(-listGap / 2),
	top: "50%",
	transform: "translateY(-50%)",
	width: mm(separatorSize),
	height: mm(2.5),
	backgroundColor: "black",
});

export const getGroupNameSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	fontFamily: "ArnoPro",
	fontStyle: "italic",
	fontWeight: "bold",
	fontSize: mm(2.5),
});
