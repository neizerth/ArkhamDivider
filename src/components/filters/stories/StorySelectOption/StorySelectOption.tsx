import { type OptionProps, components } from "react-select";

import { StorySelectValue } from "@/components";
import type { IStory } from "@/shared/model/types/api";

export type StorySelectOptionProps = OptionProps<{
	label: string;
	value: IStory;
}>;

export const StorySelectOption = (props: StorySelectOptionProps) => {
	const { children, data, isSelected } = props;
	return (
		<components.Option {...props}>
			<StorySelectValue story={data.value} isSelected={isSelected}>
				{children}
			</StorySelectValue>
		</components.Option>
	);
};
