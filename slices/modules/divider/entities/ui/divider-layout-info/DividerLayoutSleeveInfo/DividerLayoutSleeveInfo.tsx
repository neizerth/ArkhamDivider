import WarningIcon from "@mui/icons-material/Warning";
import Chip from "@mui/material/Chip";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { type MouseEvent, useId, useState } from "react";
import { useTranslation } from "react-i18next";
import type { DividerLayoutSleeve } from "@/modules/divider/shared/model";
import { getBoxSize } from "@/shared/util";
import * as C from "./DividerLayoutSleeveInfo.components";

type DividerLayoutSleeveInfoProps = {
	sleeve: DividerLayoutSleeve;
};

export function DividerLayoutSleeveInfo({
	sleeve,
}: DividerLayoutSleeveInfoProps) {
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
		<C.Container>
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
		</C.Container>
	);
}
