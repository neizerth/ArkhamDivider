import type { BinderBookmarkProps } from "../model";

export const getBinderBookmarkDefaultIcon = (props: BinderBookmarkProps) => {
	if (props.type !== "player") {
		return props.icon;
	}
	if (props.story) {
		return props.story.icon;
	}

	if (props.subtype && ["faction", "investigators"].includes(props.subtype)) {
		return props.faction;
	}

	return props.icon;
};
