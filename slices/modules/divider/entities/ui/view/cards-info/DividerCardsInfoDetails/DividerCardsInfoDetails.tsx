import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { type PropsWithChildren, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePrintSx } from "@/modules/print/shared/lib";
import { getDividerCardsNumbers } from "../../../../lib/logic";
import * as S from "./DividerCardsInfoDetails.styles";

export type DividerCardsInfoDetailsProps = PropsWithChildren & {
	cards?: Record<number, number>;
	size?: number;
};

export function DividerCardsInfoDetails({
	children,
	cards,
	size = 0,
}: DividerCardsInfoDetailsProps) {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [isHover, setIsHover] = useState(false);
	const closeTimer = useRef<number | null>(null);
	const getPrintSx = usePrintSx();
	const containerSx = getPrintSx(S.getSx);

	const { t } = useTranslation();

	const items = useMemo(() => {
		return getDividerCardsNumbers(cards).toSorted((a, b) => {
			return Number(a.number) - Number(b.number);
		});
	}, [cards]);

	const open = Boolean(anchorEl) && isHover && items.length > 0;

	const clearCloseTimer = () => {
		if (closeTimer.current != null) {
			window.clearTimeout(closeTimer.current);
			closeTimer.current = null;
		}
	};

	const scheduleClose = () => {
		clearCloseTimer();
		closeTimer.current = window.setTimeout(() => {
			setIsHover(false);
		}, 80);
	};

	return (
		<>
			<Box
				component="span"
				onMouseEnter={(e) => {
					clearCloseTimer();
					setAnchorEl(e.currentTarget);
					setIsHover(true);
				}}
				onMouseLeave={scheduleClose}
			>
				{children}
			</Box>
			<Popper
				open={open}
				anchorEl={anchorEl}
				placement="bottom"
				disablePortal
				modifiers={[
					{
						name: "offset",
						options: { offset: [0, 8] },
					},
				]}
				onMouseEnter={() => {
					clearCloseTimer();
					setIsHover(true);
				}}
				onMouseLeave={scheduleClose}
				sx={containerSx}
			>
				<Paper
					elevation={6}
					sx={{
						mt: 3,
						p: 2,
						maxWidth: 320,
						pointerEvents: "auto",
						borderRadius: 2,
					}}
				>
					<Box fontWeight={600}>
						{t`Cards`} ({size})
					</Box>
					<Box component="span">
						{items
							.map(({ number, count }) => {
								if (count === 1) {
									return number;
								}
								return `${number} × ${count}`;
							})
							.join(", ")}
					</Box>
				</Paper>
			</Popper>
		</>
	);
}
