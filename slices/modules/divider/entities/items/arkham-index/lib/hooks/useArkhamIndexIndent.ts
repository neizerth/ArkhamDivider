import { useArkhamIndexContext } from "../../ui/ArkhamIndexContext";

export const useArkhamIndexIndent = () => {
	const { tabSize, tabIndex, divider } = useArkhamIndexContext();
	const indent = divider.params?.indent ?? false;
	const canUseIndent = tabSize === 2 && tabIndex === 1;
	const canIncreaseIndent = !indent && canUseIndent;
	const canDecreaseIndent = indent && canUseIndent;

	return {
		canIncreaseIndent,
		canDecreaseIndent,
	};
};
