import { v4 } from "uuid";
import type { Divider, DividerLayout } from "@/modules/divider/shared/model";
import { getFactionIcon, isFaction } from "@/modules/faction/shared/lib";
import type { Story } from "@/modules/story/shared/model";

type Options = {
	stories: Story[];
	layout: DividerLayout;
};

export const getInvestigatorDividers = ({
	stories,
	layout,
}: Options): Divider[] => {
	const { duplicateCodes = {}, doubleSided = false } =
		layout.investigatorParams ?? {};

	const front = stories.flatMap((story) => {
		return story.investigators.flatMap((investigator) => {
			const faction = investigator.faction_code;
			if (!isFaction(faction)) {
				return [];
			}
			const icon = getFactionIcon(faction);
			const length = duplicateCodes[investigator.code] ?? 1;

			return Array.from(
				{ length },
				(): Divider => ({
					id: v4(),
					type: "investigator",
					layoutType: "investigator",
					side: "front",
					faction,
					investigator,
					storyCode: story.code,
					title: investigator.name,
					icon,
				}),
			);
		});
	});

	if (!doubleSided) {
		return front;
	}

	const back = front.map(
		(divider): Divider => ({
			...divider,
			id: v4(),
			side: "back",
		}),
	);

	return [...front, ...back];
};
