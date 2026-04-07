import { useCallback } from "react";
import { getPrintNodeRect } from "@/modules/print/shared/lib";
import type { BoxRect } from "@/shared/model";

type Options = {
	ref: React.RefObject<HTMLElement>;
	containerWidth: number;
	onRender: (rect: BoxRect) => void;
};
export const useNodePosition = ({ ref, containerWidth, onRender }: Options) => {
	const refCallback = useCallback(
		(node?: HTMLElement) => {
			if (!node) {
				return;
			}
			if (!ref.current) {
				return;
			}
			const rect = getPrintNodeRect({
				node,
				container: ref.current,
				containerWidth,
			});
			onRender(rect);
		},
		[ref.current, containerWidth, onRender],
	);

	return refCallback;
};
