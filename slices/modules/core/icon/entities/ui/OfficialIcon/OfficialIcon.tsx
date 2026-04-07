import type { IconProps } from "@mui/material/Icon";
import * as C from "./OfficialIcon.components";

type OfficialIconProps = Omit<IconProps, "icon">;

export function OfficialIcon(props: OfficialIconProps) {
	return <C.Container icon="ffg" {...props} />;
}
