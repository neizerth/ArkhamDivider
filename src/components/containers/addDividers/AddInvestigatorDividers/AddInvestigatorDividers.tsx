import {
	Col,
	Container,
	IconButton,
	StoryCustomContent,
	StorySelect,
} from "@/components";
import { Row } from "@/components/ui/grid/Row/Row";
import { useInvestigatorStories } from "@/shared/lib/hooks/stories/useInvestigatorStories";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { addInvestigatorDividers } from "@/shared/lib/store/features/addDividers/addDividers";
import {
	removeAllDividers,
	selectStory,
} from "@/shared/lib/store/features/dividers/dividers";
import { selectStoryInvestigators } from "@/shared/lib/store/features/dividers/selectors/selectStoryInvestigators";
import { ButtonType } from "@/shared/model/types/ui";
import { useTranslation } from "react-i18next";
import S from "./AddInvestigatorDividers.module.scss";

export type AddInvestigatorDividersProps = {};

export const AddInvestigatorDividers = ({}: AddInvestigatorDividersProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const stories = useInvestigatorStories();

	const story = useAppSelector(selectStory);
	const investigators = useAppSelector(selectStoryInvestigators(story));

	const storiesWithInvestigators = stories.filter(
		({ investigators }) => investigators.length > 0,
	);

	const onAdd = () => {
		if (!story) {
			return;
		}

		dispatch(
			addInvestigatorDividers({
				investigators,
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
				<Col>
					<Row wrap className={S.row}>
						<StorySelect
							className={S.select}
							stories={storiesWithInvestigators}
						/>
						{story && (
							<>
								<IconButton
									onClick={onGenerate}
									className={S.generate}
									icon="check-thin"
								>
									{t("Generate")}
								</IconButton>
								<IconButton onClick={onAdd} className={S.add} icon="plus-thin">
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
							</>
						)}
					</Row>
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
