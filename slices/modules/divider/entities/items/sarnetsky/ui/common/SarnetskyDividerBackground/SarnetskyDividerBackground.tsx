import type { BoxProps } from "@mui/material";
import { DividerBleedView } from "@/modules/divider/entities/ui";
import type { SarnetskyDividerProps } from "../../../model";
import { useSarnetskyDividerContext } from "../../SarnetskyDividerContext";
import { SarnetskyDividerBlankImage as BlankImage } from "./SarnetskyDividerBlankImage";
import { SarnetskyDividerPlayerBackground as PlayerBackground } from "./SarnetskyDividerPlayerBackground";
import { SarnetskyDividerScenarioBackground as ScenarioBackground } from "./SarnetskyDividerScenarioBackground";

type SarnetskyDividerBackgroundProps = BoxProps & SarnetskyDividerProps;

export function SarnetskyDividerBackground(
	props: SarnetskyDividerBackgroundProps,
) {
	return (
		<DividerBleedView>
			<Content {...props} />
		</DividerBleedView>
	);
}

function Content(props: SarnetskyDividerBackgroundProps) {
	const { side } = props;
	const { singleSide } = useSarnetskyDividerContext();

	const showBlankImage = singleSide && side === "back";

	if (showBlankImage) {
		return <BlankImage {...props} />;
	}
	switch (props.type) {
		case "player":
		case "investigator":
			return <PlayerBackground {...props} />;
		case "scenario":
		case "campaign":
		case "encounter":
			return <ScenarioBackground {...props} />;
	}
}
