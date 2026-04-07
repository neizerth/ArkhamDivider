import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import { Row, type RowProps } from "@/shared/ui";

const popoverContentSx: SxProps = {
	p: 2,
	maxWidth: 320,
};

const infoButtonSx: SxProps = {
	p: 0.25,
};

export type IconPopoverProps = RowProps & {
	/** Icon shown in the button that opens the popover. Defaults to InfoOutlinedIcon. */
	icon?: ReactNode;
	/** Content shown in the popover (e.g. Typography). */
	description: ReactNode;
	/** Accessible label for the icon button. */
	ariaLabel: string;
};

export function IconPopover({
	icon = <InfoOutlinedIcon fontSize="small" />,
	description,
	ariaLabel,
	children,
	...rowProps
}: IconPopoverProps) {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const onOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
	}, []);

	const onClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const sx = {
		alignItems: "center",
		gap: 0.5,
		...rowProps.sx,
	} as SxProps;

	return (
		<Row sx={sx} {...rowProps}>
			{children}
			<IconButton
				size="small"
				onClick={onOpen}
				aria-label={ariaLabel}
				sx={infoButtonSx}
			>
				{icon}
			</IconButton>
			<Popover
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={onClose}
				disableScrollLock
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				transformOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Box sx={popoverContentSx}>{description}</Box>
			</Popover>
		</Row>
	);
}
