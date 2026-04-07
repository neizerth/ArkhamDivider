import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import { useAppSelector } from "@/shared/lib";
import type { DonationUrlRecord } from "@/shared/model";

export function useDonationUrl(donationUrl?: DonationUrlRecord) {
	const language = useAppSelector(selectCurrentLanguage);

	if (!donationUrl) {
		return;
	}
	const url = donationUrl[language] ?? donationUrl.default;

	return url;
}
