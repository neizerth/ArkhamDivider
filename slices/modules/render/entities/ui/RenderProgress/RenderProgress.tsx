import Chip from "@mui/material/Chip";
import LinearProgress, {
	type LinearProgressProps,
} from "@mui/material/LinearProgress";
import Stack, { type StackProps } from "@mui/material/Stack";
import { isNumber } from "ramda-adjunct";
import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();

	if (status !== "pending") {
		return null;
	}

	const progressProps: LinearProgressProps = isNumber(value)
		? { value, variant: "determinate" }
		: {};

	return (
		<Stack {...props} alignItems="center" gap={1}>
			<LinearProgress sx={{ width: "100%" }} {...progressProps} />
			{message && <Chip label={t(message)} color="primary" />}
		</Stack>
	);
}
