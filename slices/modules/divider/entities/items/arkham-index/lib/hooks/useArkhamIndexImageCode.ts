import { useCallback } from "react";
import { copyToClipboard } from "@/shared/lib";

export function useArkhamIndexImageCode<T extends Element>(url?: string) {
	return useCallback(
		(e: React.MouseEvent<T>) => {
			const code = url?.split("/").pop()?.replace(".avif", "");
			copyToClipboard(code ?? "");
			e.preventDefault();
		},
		[url],
	);
}
