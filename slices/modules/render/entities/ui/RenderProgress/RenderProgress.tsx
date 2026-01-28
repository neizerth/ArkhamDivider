import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Stack, { type StackProps } from "@mui/material/Stack";
import {
	selectRenderProgressValue,
	selectRenderStatus,
	selectRenderStatusMessage,
} from "@/modules/render/shared/lib";
import { useAppSelector } from "@/shared/lib";

type RenderProgressProps = StackProps;

export function RenderProgress(props: RenderProgressProps) {
	const status = useAppSelector(selectRenderStatus);
	const value = useAppSelector(selectRenderProgressValue);
	const message = useAppSelector(selectRenderStatusMessage);

	if (status !== "pending") {
		return null;
	}

	return (
		<Stack {...props} alignItems="center" gap={1}>
			<LinearProgress sx={{ width: "100%" }} value={value} />
			{message && <Chip label={message} color="primary" />}
		</Stack>
	);
}
