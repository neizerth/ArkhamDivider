import type { PropsWithChildren } from "react";
import { selectDividerRenderId } from "@/modules/render/shared/lib";
import { useAppSelector } from "@/shared/lib";

type DividerNotExportableProps = PropsWithChildren & {
	id?: string;
};

export function DividerNotExportable({
	children,
	id,
}: DividerNotExportableProps) {
	const exportDividerId = useAppSelector(selectDividerRenderId);

	if (exportDividerId && !id) {
		return null;
	}

	if (exportDividerId === id) {
		return null;
	}

	return children;
}
