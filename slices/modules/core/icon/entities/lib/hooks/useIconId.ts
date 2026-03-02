import { isBlobUrl, useMediaUrl } from "@/modules/core/media/shared/lib";

type Options = {
	id?: string | null;
	defaultValue?: string | null;
};
export const useIconId = ({ id, defaultValue }: Options) => {
	const url = useMediaUrl(id);

	if (!isBlobUrl(url)) {
		return id ?? defaultValue;
	}

	return url ?? defaultValue;
};
