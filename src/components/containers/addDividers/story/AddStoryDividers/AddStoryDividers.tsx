import {
	AddStoryParams,
	Col,
	Container,
	IconButton,
	Row,
	StoryCustomContent,
	StorySelect,
	WithLayoutSupport,
} from "@/components";
import { useCampaignStories } from "@/shared/lib/hooks/stories/useCampaignStories";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { addStoryDividers } from "@/shared/lib/store/features/addDividers/addDividers";
import {
	removeAllDividers,
	selectStory,
} from "@/shared/lib/store/features/dividers/dividers";
import { withScenario } from "@/shared/lib/store/features/stories/criteria";
import { ButtonType } from "@/shared/model/types/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import S from "./AddStoryDividers.module.scss";

export type AddStoryDividersProps = {};

export const AddStoryDividers = ({}: AddStoryDividersProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const story = useAppSelector(selectStory);

	const allStories = useCampaignStories();

	const stories = allStories.filter(withScenario);

	const [form, onFormChange] = useState({
		includeExtraSets: false,
		includeReturnSets: true,
		includeScenarios: true,
		includeEncounterSize: false,
		includeCampaignIcon: false,
		includeScenarioEncounterSet: false,
		includeScenarioSize: false,
		includeCampaign: true,
		includeEncounters: true,
	});

	const onAdd = () => {
		if (!story) {
			return;
		}
		dispatch(
			addStoryDividers({
				story,
				...form,
			}),
		);
	};

	const onGenerate = () => {
		onClear();
		onAdd();
	};

	const onClear = () => dispatch(removeAllDividers());

	return (
		<div className={S.container}>
			<Container>
				<Col className={S.col}>
					<div className={S.row}>
						<Row wrap>
							<StorySelect className={S.select} stories={stories} />
							{story && (
								<WithLayoutSupport>
									<IconButton
										onClick={onGenerate}
										className={S.generate}
										icon="check-thin"
									>
										{t("Generate")}
									</IconButton>
									<IconButton
										onClick={onAdd}
										className={S.add}
										icon="plus-thin"
									>
										{t("Add")}
									</IconButton>
									<IconButton
										onClick={onClear}
										className={S.add}
										buttonType={ButtonType.DANGER}
										icon="trash"
									>
										{t("Clear")}
									</IconButton>
								</WithLayoutSupport>
							)}
						</Row>
					</div>
					{story && (
						<WithLayoutSupport>
							<AddStoryParams
								onChange={onFormChange}
								defaultValue={form}
								story={story}
							/>
						</WithLayoutSupport>
					)}
					{story?.custom_content && (
						<div>
							<StoryCustomContent content={story.custom_content} />
						</div>
					)}
				</Col>
			</Container>
		</div>
	);
};
