import type { PropsWithChildren } from "react";
import {
	selectDividerRenderId,
	selectRenderType,
} from "@/modules/render/shared/lib";
import { useAppSelector } from "@/shared/lib";
import type { RenderType } from "../../model";

type NotExportableProps = PropsWithChildren & {
	id?: string;
	visible?: boolean;
	visibleOn?: RenderType[];
	hiddenOn?: RenderType[];
};

export function NotExportable({
	children,
	id,
	visible = false,
	visibleOn,
	hiddenOn,
}: NotExportableProps) {
	const exportDividerId = useAppSelector(selectDividerRenderId);
	const renderType = useAppSelector(selectRenderType);

	if (visibleOn && renderType && visibleOn.includes(renderType)) {
		return children;
	}

	if (hiddenOn && renderType && hiddenOn.includes(renderType)) {
		return null;
	}

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
