import { useEffect, useState } from "react";
import { getMediaURL } from "../mediaURL";

export const useMediaURL = (id: string) => {
	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			return;
		}
		getMediaURL(id).then(setUrl);
	}, [id]);

	return url;
};
