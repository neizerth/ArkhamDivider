import type { LinearProgressProps } from "@mui/material/LinearProgress";
import LinearProgress from "@mui/material/LinearProgress";
import {
	selectRenderProgressValue,
	selectRenderStatus,
} from "@/modules/render/shared/lib";
import { useAppSelector } from "@/shared/lib";

type RenderProgressProps = LinearProgressProps;

export function RenderProgress(props: RenderProgressProps) {
	const status = useAppSelector(selectRenderStatus);
	const value = useAppSelector(selectRenderProgressValue);

	if (status === "idle") {
		return null;
	}

	return <LinearProgress {...props} value={value} />;
}
