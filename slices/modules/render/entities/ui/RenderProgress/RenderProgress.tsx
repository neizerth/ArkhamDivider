import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import Chip from "@mui/material/Chip";
import LinearProgress, {
	type LinearProgressProps,
} from "@mui/material/LinearProgress";
import Stack, { type StackProps } from "@mui/material/Stack";
import { isNumber } from "ramda-adjunct";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
	cancelRender,
	selectRenderProgressValue,
	selectRenderStatus,
	selectRenderStatusMessage,
} from "@/modules/render/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";

type RenderProgressProps = StackProps;

export function RenderProgress(props: RenderProgressProps) {
	const dispatch = useAppDispatch();
	const status = useAppSelector(selectRenderStatus);
	const value = useAppSelector(selectRenderProgressValue);
	const message = useAppSelector(selectRenderStatusMessage);
	const { t } = useTranslation();

	const cancel = useCallback(() => {
		dispatch(cancelRender());
	}, [dispatch]);

	if (status !== "pending") {
		return null;
	}

	const progressProps: LinearProgressProps = isNumber(value)
		? { value, variant: "determinate" }
		: {};

	return (
		<Stack {...props} alignItems="center" gap={1}>
			<LinearProgress sx={{ width: "100%" }} {...progressProps} />
			<Row gap={2} alignItems="center">
				{message && <Chip label={t(message)} color="primary" />}
				<IconButton
					onClick={cancel}
					sx={{
						color: "#f9f9f9",
						backgroundColor: "error.dark",
					}}
					size="small"
				>
					<ClearIcon />
				</IconButton>
			</Row>
		</Stack>
	);
}
