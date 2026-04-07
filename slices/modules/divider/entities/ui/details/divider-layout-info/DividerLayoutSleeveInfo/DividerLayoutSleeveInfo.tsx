import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { IconPopover } from "@/modules/core/icon/shared/ui";
import type { DividerLayoutSleeve } from "@/modules/divider/shared/model";
import { Row } from "@/shared/ui";
import { DividerLayoutSleeve as Sleeve } from "../DividerLayoutSleeve";
import * as C from "./DividerLayoutSleeveInfo.components";
import * as S from "./DividerLayoutSleeveInfo.styles";

type DividerLayoutSleeveInfoProps = {
	sleeves: DividerLayoutSleeve[];
};

export function DividerLayoutSleeveInfo({
	sleeves,
}: DividerLayoutSleeveInfoProps) {
	const { t } = useTranslation();

	return (
		<Row sx={S.optionSx}>
			<Row sx={S.optionTitleSx}>
				<Typography variant="body2" sx={S.optionLabelSx}>
					{t`Sleeves`}
				</Typography>
				<C.Icon title={t`Sleeves`}>
					<ShieldOutlinedIcon />
				</C.Icon>
			</Row>
			<Box sx={{ overflow: "auto" }}>
				<Row gap={1}>
					<IconPopover
						ariaLabel={t("info.sleeves")}
						description={
							<Typography variant="body2">{t("info.sleeves")}</Typography>
						}
					/>
					{sleeves.map((sleeve) => (
						<Sleeve key={sleeve.id} sleeve={sleeve} />
					))}
				</Row>
			</Box>
		</Row>
	);
}
