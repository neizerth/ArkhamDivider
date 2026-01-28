import type { PropsWithChildren } from "react";
import { useAppSelector } from "@/shared/lib";
import { selectExportDividerId } from "../../lib";

type DividerNotExportableProps = PropsWithChildren & {
	id?: string;
};

export function DividerNotExportable({
	children,
	id,
}: DividerNotExportableProps) {
	const exportDividerId = useAppSelector(selectExportDividerId);

	if (exportDividerId && !id) {
		return null;
	}

	if (exportDividerId === id) {
		return null;
	}

	return children;
}
