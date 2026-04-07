import BleedIcon from "@assets/images/bleed.svg?react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { IconPopover } from "@/modules/core/icon/shared/ui";
import { Row } from "@/shared/ui";
import * as C from "./BleedInfo.components";
import * as S from "./BleedInfo.styles";

type BleedInfoProps = {
	bleed: number;
};

export function BleedInfo({ bleed }: BleedInfoProps) {
	const { t } = useTranslation();

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
			<IconPopover
				ariaLabel={t("info.bleed")}
				description={<Typography variant="body2">{t("info.bleed")}</Typography>}
			>
				<Typography variant="body1">
					{bleed} {t`mm`}
				</Typography>
			</IconPopover>
		</Row>
	);
}
