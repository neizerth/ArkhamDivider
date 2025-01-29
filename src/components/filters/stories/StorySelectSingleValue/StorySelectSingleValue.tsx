import { type SingleValueProps, components } from "react-select";

import type { IStory } from "@/shared/model/types/api";
import { StorySelectValue } from "../StorySelectValue/StorySelectValue";

export type StorySelectSingleValueProps = SingleValueProps<{
	label: string;
	value: IStory;
}>;

export const StorySelectSingleValue = ({
	children,
	...props
}: StorySelectSingleValueProps) => {
	const { data } = props;
	return (
		<components.SingleValue {...props}>
			<StorySelectValue story={data.value}>{children}</StorySelectValue>
		</components.SingleValue>
	);
};
