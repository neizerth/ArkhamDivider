import type { PropsWithChildren } from "react";
import { useAppSelector } from "@/shared/lib";
import { selectExportEnabled } from "../../lib/store";

export function NotExportable({ children }: PropsWithChildren) {
	const exportEnabled = useAppSelector(selectExportEnabled);

	if (exportEnabled) {
		return;
	}

	return children;
}
