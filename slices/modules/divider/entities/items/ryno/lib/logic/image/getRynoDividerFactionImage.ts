import { getFactionImage, isFaction } from "@/modules/faction/shared/lib";
import type { Faction } from "@/modules/faction/shared/model";
import type { RynoDividerProps } from "../../../model";

type Props = RynoDividerProps & {
	layoutType: "investigator" | "player";
};

export const getRynoDividerFactionImage = (props: Props) => {
	const customIcon = props.params?.leftIcon;

	if (isFaction(customIcon)) {
		return getFactionImage(customIcon as Faction);
	}

	return getFactionImage(props.faction);
};
