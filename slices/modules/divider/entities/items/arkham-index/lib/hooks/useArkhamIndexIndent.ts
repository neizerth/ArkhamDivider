import { useCallback } from "react";
import { useDividerParam } from "@/modules/divider/shared/lib";
import { useArkhamIndexContext } from "../../ui/ArkhamIndexContext";

export const useArkhamIndexIndent = () => {
	const { tabSize, tabIndex, divider } = useArkhamIndexContext();
	const indent = divider.params?.indent ?? false;
	const canUseIndent = tabSize === 2 && tabIndex !== 0;
	const canIncreaseIndent = !indent && canUseIndent;
	const canDecreaseIndent = indent && canUseIndent;

	const dividerId = divider.id;

	const setIndent = useDividerParam({ dividerId, key: "indent" });

	const increaseIndent = useCallback(() => {
		if (canIncreaseIndent) {
			setIndent(true);
		}
	}, [canIncreaseIndent, setIndent]);

	const decreaseIndent = useCallback(() => {
		if (canDecreaseIndent) {
			setIndent(false);
		}
	}, [canDecreaseIndent, setIndent]);

	return {
		canIncreaseIndent,
		canDecreaseIndent,
		increaseIndent,
		decreaseIndent,
	};
};
