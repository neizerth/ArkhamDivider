import { useEffect, useState } from "react";
import { getMediaUrl } from "../mediaUrl";

export const useMediaUrl = (id?: string | null) => {
	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			return;
		}
		getMediaUrl(id).then(setUrl);
	}, [id]);

	return url;
};
