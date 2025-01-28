import { Row } from "@/components/ui/grid/Row/Row";
import S from "./AddInvestigatorDividers.module.scss";
import {
	Col,
	Container,
	IconButton,
	StoryCustomContent,
	StorySelect,
} from "@/components";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { ButtonType } from "@/shared/types/ui";
import {
	removeAllDividers,
	selectStory,
} from "@/shared/store/features/dividers/dividers";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useTranslation } from "react-i18next";
import { addInvestigatorDividers } from "@/shared/store/features/addDividers/addDividers";
import { useInvestigatorStories } from "@/shared/lib/hooks/stories/useInvestigatorStories";
import { selectStoryInvestigators } from "@/shared/store/features/dividers/selectors/selectStoryInvestigators";

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
