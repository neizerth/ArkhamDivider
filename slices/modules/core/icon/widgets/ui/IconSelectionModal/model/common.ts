export type IconGroup = {
	id: string;
	name: string;
	groups: IconSubgroup[];
};

export type IconSubgroup = {
	id: string;
	icon?: string;
	icons: string[];
	name?: string;
};
export type IconSelectionSectionRef = React.RefObject<HTMLDivElement | null>;
