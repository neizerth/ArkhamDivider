import type { PropsWithChildren } from "react";
import { selectDividerRenderId } from "@/modules/render/shared/lib";
import { useAppSelector } from "@/shared/lib";

type NotExportableProps = PropsWithChildren & {
	id?: string;
};

export function NotExportable({ children, id }: NotExportableProps) {
	const exportDividerId = useAppSelector(selectDividerRenderId);

	if (exportDividerId && !id) {
		return null;
	}

	if (exportDividerId === id) {
		return null;
	}

	return children;
}
