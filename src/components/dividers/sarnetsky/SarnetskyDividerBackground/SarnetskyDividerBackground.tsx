import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectLayout } from "@/shared/lib/store/features/layout/layout";
import { DividerType } from "@/shared/model/types/dividers";
import classNames from "classnames";
import { propEq } from "ramda";
import type { ComponentProps, FC } from "react";
import S from "./SarnetskyDividerBackground.module.scss";
import { encounterImages } from "./images/encounter";
import { playerImages } from "./images/player";
import { scenarioImages } from "./images/scenario";
import { DEFAULT_COLOR, storyColors } from "./storyColors";

export const SarnetskyPlayerBackground = ({
	id,
}: {
	id: string;
}) => {
	const src = playerImages.find(propEq(id, "id"))?.background;

	return <>{src && <img src={src} alt={id} className={S.background} />}</>;
};

export type SarnetskyStoryBackgroundProps = {
	storyCode: string;
};

export const SarnetskyScenarioBackground = ({
	storyCode,
}: SarnetskyStoryBackgroundProps) => {
	const { orientation } = useAppSelector(selectLayout);

	const item = scenarioImages.find(propEq(orientation, "orientation"));

	const color = storyColors[storyCode] || DEFAULT_COLOR;

	return <>{item && <SarnetskyLayeredBackground {...item} color={color} />}</>;
};

export const SarnetskyEncounterBackground = ({
	storyCode,
}: SarnetskyStoryBackgroundProps) => {
	const { orientation } = useAppSelector(selectLayout);

	const item = encounterImages.find(propEq(orientation, "orientation"));

	const color = storyColors[storyCode] || DEFAULT_COLOR;

	return <>{item && <SarnetskyLayeredBackground {...item} color={color} />}</>;
};

export const SarnetskyLayeredBackground = ({
	Color,
	color,
	frame,
	background,
}: {
	Color: FC<ComponentProps<"svg">>;
	frame: string;
	background: string;
	color?: string;
}) => {
	const { orientation } = useAppSelector(selectLayout);

	return (
		<div className={S.layers}>
			<img src={background} alt="background" className={S.background} />
			<img src={frame} alt="frame" className={S.frame} />
			<Color
				className={classNames(S.color, S[`color_${orientation}`])}
				fill={color}
			/>
		</div>
	);
};

export type SarnetskyDividerBackgroundProps = {
	id: string;
	type: DividerType;
	storyCode?: string;
};

export const SarnetskyDividerBackground = ({
	id,
	type,
	storyCode,
}: SarnetskyDividerBackgroundProps) => {
	return (
		<>
			{[DividerType.PLAYER, DividerType.INVESTIGATOR].includes(type) && (
				<SarnetskyPlayerBackground id={id} />
			)}
			{[DividerType.SCENARIO, DividerType.CAMPAIGN].includes(type) &&
				storyCode && <SarnetskyScenarioBackground storyCode={storyCode} />}
			{type === DividerType.ENCOUNTER && storyCode && (
				<SarnetskyEncounterBackground storyCode={storyCode} />
			)}
		</>
	);
};
