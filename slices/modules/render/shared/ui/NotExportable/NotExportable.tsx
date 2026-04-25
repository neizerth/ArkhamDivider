import type { PropsWithChildren } from "react";
import { selectDividerRenderId } from "@/modules/render/shared/lib";
import { useAppSelector } from "@/shared/lib";

type NotExportableProps = PropsWithChildren & {
	id?: string;
	visible?: boolean;
};

export function NotExportable({
	children,
	id,
	visible = false,
}: NotExportableProps) {
	const exportDividerId = useAppSelector(selectDividerRenderId);

	if (visible) {
		return children;
	}

	if (exportDividerId && !id) {
		return null;
	}

	if (exportDividerId === id) {
		return null;
	}

	return children;
}
