import { Box } from "@mui/material";
import {
	DividerBackground as Background,
	DividerBleedView as BleedView,
	DividerColorPicker as ColorPicker,
	DividerContainer as Container,
	DividerContent as Content,
	DividerText,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import { absoluteFill } from "@/shared/config";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { carlosLemosBaseUrl } from "../../config";
import { carlosLemosObjects as O } from "../../config/objects";
import {
	getCarlosLemosDividerColor as getBackgroundColor,
	getCarlosLemosDividerBackgroundType as getBackgroundType,
	getCarlosLemosDividerColorBrightness as getColorBrightness,
} from "../../lib";
import type { CarlosLemosDividerParams } from "../../model";
import { CarlosLemosDividerEncounterIcons as EncounterIcons } from "../CarlosLemosDividerEncounterIcons";
import {
	CarlosLemosScenarioNumber as ScenarioNumber,
	CarlosLemosDividerTitle as Title,
} from "../text";
import * as S from "./CarlosLemosDivider.styles";

const asset = prefix(carlosLemosBaseUrl);

export function CarlosLemosDivider(props: CarlosLemosDividerParams) {
	const { t } = useStoryTranslation(props.story);

	const { type, story, params, id, side } = props;

	const backgroundType = getBackgroundType(type);

	const getPrintSx = usePrintSx();

	const backgroundSrc = asset(`/${backgroundType}.avif`);
	const colorSrc = asset(`/${backgroundType}-color.avif`);

	const colorSx = getPrintSx(S.getColorSx, { maskSrc: colorSrc });
	const backgroundColorSx = getPrintSx(S.getBackgroundColorSx);
	const titleSx = getPrintSx(S.getTitleSx);
	const iconSx = getPrintSx(S.getIconSx);
	const scenarioNumberSx = getPrintSx(S.getScenarioNumberSx);
	const campaignTitleSx = getPrintSx(S.getCampaignTitleSx);
	const encounterIconsSx = getPrintSx(S.getEncounterIconsSx);
	const menuSx = getPrintSx(S.getMenuSx);

	const defaultBackgroundColor = getBackgroundColor(story);
	const backgroundColor = params?.backgroundColor ?? defaultBackgroundColor;
	const colorBrightness = getColorBrightness(backgroundColor);

	const isEncounter = type === "encounter";
	const getDividerIcon = useDividerIcon({
		dividerId: id,
	});

	const [icon, setIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: props.icon,
	});

	return (
		<Container>
			<Background src={backgroundSrc} />
			<BleedView sx={{ isolation: "isolate" }}>
				<Image
					src={colorSrc}
					sx={{
						...absoluteFill,
						width: "100%",
						height: "100%",
						filter: `brightness(${colorBrightness})`,
					}}
				/>
				<Box
					sx={{
						...colorSx,
						backgroundColor,
					}}
				/>
			</BleedView>
			<Content side={side}>
				{isEncounter ? (
					<EncounterIcons divider={props} sx={encounterIconsSx} />
				) : (
					<>
						<Title divider={props} sx={titleSx} />
						<Icon
							dividerId={id}
							icon={icon}
							sx={iconSx}
							{...O.icon.params}
							onClick={setIcon}
						/>
						<ScenarioNumber divider={props} sx={scenarioNumberSx} />
					</>
				)}

				{props.type !== "campaign" && props.story && (
					<DividerText
						dividerId={id}
						sx={campaignTitleSx}
						value={t(props.story.name)}
					/>
				)}
				<NotExportable>
					<ColorPicker
						sx={backgroundColorSx}
						defaultColor={defaultBackgroundColor}
						dividerId={id}
						param="backgroundColor"
						title={t(`divider.carlosLemos.backgroundColor.pickerTitle`)}
					/>
					<Menu dividerId={id} sx={menuSx} />
				</NotExportable>
			</Content>
		</Container>
	);
}

export default CarlosLemosDivider;
