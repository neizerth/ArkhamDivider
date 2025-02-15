import { useParams } from "react-router-dom";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";
import { selectStory, setStory } from "@/shared/store/features/dividers/dividers";
import { useEffect } from "react";
import { selectLoading } from "@/shared/store/features/app/app";
import { selectStories } from "@/shared/store/features/stories/stories";
import { propEq } from "ramda";

export const useStoryNavigation = () => {
	const { storyId } = useParams();
	const dispatch = useAppDispatch();
	const currentStory = useAppSelector(selectStory);
	const loading = useAppSelector(selectLoading);
	const stories = useAppSelector(selectStories);

	useEffect(() => {
		if (loading) {
			return;
		}
		if (storyId === currentStory?.code) {
			return;
		}
		if (!storyId) {
			dispatch(setStory(null));
			return;
		}

		const story = stories.find(propEq(storyId, "code"));

		if (!story) {
			return;
		}

		dispatch(setStory(story));
	}, [storyId, loading]);
};
