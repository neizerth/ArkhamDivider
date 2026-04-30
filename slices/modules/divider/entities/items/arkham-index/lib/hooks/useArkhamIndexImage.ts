import { useCallback } from "react";
import { setDividerParam } from "@/modules/divider/shared/lib";
import { useNumber } from "@/shared/lib/hooks/common";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/store";
import { getArkhamIndexDividerImageUrl } from "../../api";
import { useArkhamIndexContext } from "../../ui/ArkhamIndexContext";
import { selectArkhamIndexData } from "../store";

export const useArkhamIndexImage = () => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectArkhamIndexData);
	const { divider, layout } = useArkhamIndexContext();

	const dividerId = divider.id;

	const { orientation } = layout;
	const customImage = divider.params?.customImage ?? null;

	const code =
		divider.type === "investigator" ? divider.investigator.code : null;
	const coversCount = code ? (data?.investigator_alternatives?.[code] ?? 1) : 0;

	const [version, versionControl] = useNumber({
		loop: true,
		initialValue: 1,
		min: 1,
		max: coversCount,
	});

	const setCustomImage = useCallback(
		(url: string | null) => {
			dispatch(
				setDividerParam({ id: dividerId, key: "customImage", value: url }),
			);
		},
		[dispatch, dividerId],
	);

	const revokeCustomImage = useCallback(() => {
		if (customImage) {
			URL.revokeObjectURL(customImage);

			setCustomImage(null);
		}
	}, [customImage, setCustomImage]);

	const imageUrl = getArkhamIndexDividerImageUrl({
		divider,
		orientation,
		version,
	});

	const url = customImage ?? imageUrl;

	const next = useCallback(() => {
		revokeCustomImage();
		versionControl.increment();
	}, [versionControl.increment, revokeCustomImage]);

	const prev = useCallback(() => {
		revokeCustomImage();
		versionControl.decrement();
	}, [versionControl.decrement, revokeCustomImage]);

	const upload = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) {
				return;
			}
			revokeCustomImage();
			const url = URL.createObjectURL(file);

			setCustomImage(url);
		},
		[revokeCustomImage, setCustomImage],
	);

	return {
		url,
		coversCount,
		customImage,
		revokeCustomImage,
		upload,
		next,
		prev,
	};
};
