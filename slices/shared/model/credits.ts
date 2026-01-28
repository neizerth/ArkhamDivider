export type Author = {
	id: string;
	name: string;
	primary?: boolean;
	role?: string;
	image?: string;
	donationUrl?: string;
	contactUrl?: string;
	contacts?: Contact[];
};

export type Contact = {
	id: string;
	icon: string;
	url: string;
	title?: string;
	donation?: boolean;
	primary?: boolean;
};
