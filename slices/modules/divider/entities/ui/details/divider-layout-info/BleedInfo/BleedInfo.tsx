import BleedIcon from "@assets/images/bleed.svg?react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row } from "@/shared/ui";
import * as C from "./BleedInfo.components";
import * as S from "./BleedInfo.styles";

type BleedInfoProps = {
	bleed: number;
};

export function BleedInfo({ bleed }: BleedInfoProps) {
	const { t } = useTranslation();
	const [infoAnchor, setInfoAnchor] = useState<HTMLElement | null>(null);

	const onInfoClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
		setInfoAnchor(e.currentTarget);
	}, []);

	const onInfoClose = useCallback(() => {
		setInfoAnchor(null);
	}, []);

	return (
		<Row sx={S.optionSx}>
			<Row sx={S.optionTitleSx}>
				<Typography variant="body2" sx={S.optionLabelSx}>
					{t`Bleed`}
				</Typography>
				<C.Icon title={t`Bleed`}>
					<BleedIcon width={24} height={24} />
				</C.Icon>
			</Row>
			<Row sx={S.valueRowSx}>
				<Typography variant="body1">
					{bleed} {t`mm`}
				</Typography>
				<IconButton
					size="small"
					onClick={onInfoClick}
					aria-label={t("info.bleed")}
					sx={S.infoButtonSx}
				>
					<InfoOutlinedIcon fontSize="small" />
				</IconButton>
				<Popover
					open={Boolean(infoAnchor)}
					anchorEl={infoAnchor}
					onClose={onInfoClose}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					transformOrigin={{ vertical: "top", horizontal: "center" }}
				>
					<Typography sx={S.popoverContentSx} variant="body2">
						{t("info.bleed")}
					</Typography>
				</Popover>
			</Row>
		</Row>
	);
}
