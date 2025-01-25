import S from "./StorySelect.module.scss";
import Select from "react-select";

import { IStory } from "@/shared/types/api";
import {
	isChallenge,
	isSideContent,
	isCampaign,
} from "@/app/store/features/stories/criteria";
import { StorySelectOption } from "../StorySelectOption/StorySelectOption";
import { StorySelectSingleValue } from "../StorySelectSingleValue/StorySelectSingleValue";
import { ascend, descend, prop, sortWith } from "ramda";
import { PropsWithClassName } from "@/shared/types/util";
import classNames from "classnames";
import { useAppNavigate } from "@/shared/lib/hooks/useAppNavigate";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectStory } from "@/app/store/features/dividers/dividers";
import { useStoryTranslation } from "@/shared/lib/hooks/useStoryTranslation";
import { Row } from "@/components/ui/grid/Row/Row";
import { IconButton } from "@/components/ui/IconButton/IconButton";
import { ButtonType } from "@/shared/types/ui";
import { toArrayIf } from "@/shared/lib/features/util/common";

export type StorySelectProps = PropsWithClassName & {
	stories: IStory[];
	clear?: boolean;
};

export const StorySelect = ({
	stories,
	clear = false,
	className,
}: StorySelectProps) => {
	const { t, translateStory } = useStoryTranslation();
	const navigate = useAppNavigate();
	const story = useAppSelector(selectStory);

	const data = sortWith(
		[
			ascend(({ position }) => position || Infinity),
			descend(({ is_official }) => Boolean(is_official)),
			ascend(prop("name")),
		],
		stories,
	);

	const labels = data.reduce((target, story) => {
		const { name, code } = story;
		target.set(code, translateStory(name, story));
		return target;
	}, new Map());

	const mapStory = (story: IStory) => ({
		label: translateStory(story.name, story),
		value: story,
	});

	const onChange = (story?: IStory) => {
		const storyId = story?.code;
		// console.log({ storyId })
		navigate({
			storyId,
		});
	};

	const getOptions = (filter: (story: IStory) => boolean) => {
		const stories = data.filter(filter);
		return stories.map(mapStory);
	};

	const campaigns = getOptions(isCampaign);
	const sideContent = getOptions(isSideContent);
	const challenges = getOptions(isChallenge);
	const isRest = (story: IStory) =>
		!isCampaign(story) && !isSideContent(story) && !isChallenge(story);

	const rest = getOptions(isRest);

	const groups = [
		{
			label: t("Campaigns"),
			options: campaigns,
		},
		{
			label: t("Side Scenarios"),
			options: sideContent,
		},
		{
			label: t("Challenge Scenarios"),
			options: challenges,
		},
		...toArrayIf(rest.length > 0, {
			label: t("Other"),
			options: rest,
		}),
	];

	const components = {
		Option: StorySelectOption,
		SingleValue: StorySelectSingleValue,
	};

	const getSelectValue = (story: IStory) => {
		for (const group of groups) {
			for (const option of group.options) {
				if (option.value.code === story.code) {
					return option;
				}
			}
		}
	};

	const value = story ? getSelectValue(story) : null;

	return (
		<Row className={classNames(S.container, className)}>
			<Select
				isMulti={false}
				onChange={(item) => onChange(item?.value)}
				className={classNames(S.select)}
				placeholder={t("Select Campaign")}
				options={groups}
				value={value}
				getOptionLabel={({ value }) => labels.get(value.code)}
				components={components}
			/>

			{clear && (
				<IconButton
					className={S.clear}
					buttonType={ButtonType.SECONDARY}
					icon="trash"
					onClick={() => onChange()}
				>
					{t("Clear")}
				</IconButton>
			)}
		</Row>
	);
};
