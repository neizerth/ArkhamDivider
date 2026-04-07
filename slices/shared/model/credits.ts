export type DonationUrlRecord = Record<string, string> & { default: string };

export type Author = {
	id: string;
	name: string;
	primary?: boolean;
	role?: string;
	image?: string;
	donationUrl?: DonationUrlRecord;
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
