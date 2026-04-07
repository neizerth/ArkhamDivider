import WarningIcon from "@mui/icons-material/Warning";
import { Box, type BoxProps } from "@mui/material";
import Chip from "@mui/material/Chip";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { type MouseEvent, useId, useState } from "react";
import { useTranslation } from "react-i18next";
import type { DividerLayoutSleeve as SleeveType } from "@/modules/divider/shared/model";
import { getBoxSize } from "@/shared/util";

type DividerLayoutSleeveProps = BoxProps & {
	sleeve: SleeveType;
};

export function DividerLayoutSleeve({
	sleeve,
	...props
}: DividerLayoutSleeveProps) {
	const id = useId();
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

	const { t } = useTranslation();

	const unitSize = getBoxSize(sleeve.size);
	const { description } = sleeve;
	const { title } = sleeve.size;
	const name = title ? `${title} (${unitSize})` : `${unitSize}`;

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<Box {...props}>
			{description ? (
				<>
					<Chip
						label={name}
						aria-describedby={id}
						onClick={handleClick}
						icon={<WarningIcon />}
						sx={{ padding: 0.5 }}
						color="warning"
					/>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
					>
						<Typography sx={{ p: 2 }}>{t(description)}</Typography>
					</Popover>
				</>
			) : (
				<Chip label={name} />
			)}
		</Box>
	);
}
