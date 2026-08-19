import type { PropsWithChildren } from "react";
import {
	selectIsDividerRendering,
	selectIsRendering,
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
	const isAnyRendering = useAppSelector(selectIsRendering);
	const isRendering = useAppSelector(selectIsDividerRendering(id));
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

	if (isAnyRendering && !id) {
		return null;
	}

	if (isRendering) {
		return null;
	}

	return children;
}
