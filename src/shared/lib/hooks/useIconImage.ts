import { getIconImage } from "@/shared/lib/features/icons/getIconImage";
import { selectIcons } from "@/shared/lib/store/features/icons/icons";
import type { IIcon } from "@/shared/model/types/api";
import { propEq } from "ramda";
import { useEffect, useState } from "react";
import { useAppSelector } from "./useAppSelector";

export type UseIconImageData = {
	image: HTMLImageElement;
	icon: IIcon;
};

export type UseIconImageOptions = {
	icon?: string | false;
};

export type IconImageStatus = "initial" | "loading" | "complete" | "error";

export const useIconImage = ({
	icon,
}: UseIconImageOptions): [UseIconImageData | undefined, IconImageStatus] => {
	const icons = useAppSelector(selectIcons);

	const entry = icon && icons.find(propEq(icon, "icon"));
	const [data, setData] = useState<UseIconImageData>();
	const [status, setStatus] = useState<IconImageStatus>("initial");

	useEffect(() => {
		if (!entry) {
			setStatus("complete");
			return;
		}

		setStatus("loading");

		getIconImage(entry.icon).then((image) => {
			setStatus("complete");
			setData({
				image,
				icon: entry,
			});
		});
	}, [entry]);

	return [data, status];
};
