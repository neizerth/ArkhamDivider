import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { IconCorrection as Icon } from "@/modules/core/icon/entities/ui";
import { layoutRoute } from "@/modules/core/router/entities/lib";
import type { DividerLayoutGroup } from "@/modules/divider/shared/model";
import { Row } from "@/shared/ui";
import { getBoxSize } from "@/shared/util";
import * as C from "./DividerLayoutGroupPreview.components";

type DividerLayoutGroupPreviewProps = {
	group: DividerLayoutGroup;
};

const iconSx = {
	ml: 0.5,
	mr: 0.3,
	fontSize: 22,
};

export function DividerLayoutGroupPreview({
	group,
}: DividerLayoutGroupPreviewProps) {
	const { t } = useTranslation();
	const [firstLayout] = group.layouts;
	const layoutId = firstLayout.id;
	const name = firstLayout.previewName ?? getBoxSize(group.size);

	const { hasGrayscale, canBeSleeved, compatibility } = group;
	const { chapter1Box, chapter2Box, deckBox } = compatibility;

	return (
		<C.Container to={layoutRoute({ layoutId })}>
			<C.Chip alignItems="center">
				<Typography variant="body2">{name}</Typography>
				<Row alignItems="center" pl={0.5}>
					{hasGrayscale && (
						<C.Icon title={t`divider.hasGrayscale`}>
							<ContrastOutlinedIcon />
						</C.Icon>
					)}
					{canBeSleeved && (
						<C.Icon title={t`divider.canBeSleeved`}>
							<ShieldOutlinedIcon />
						</C.Icon>
					)}

					{chapter1Box && (
						<C.Icon>
							<Icon
								title={t`divider.chapter1BoxCompatible`}
								icon="the_first_day"
								sx={iconSx}
							/>
						</C.Icon>
					)}
					{chapter2Box && (
						<C.Icon>
							<Icon
								title={t`divider.chapter2BoxCompatible`}
								icon="the_second_day"
								sx={iconSx}
							/>
						</C.Icon>
					)}
					{deckBox && (
						<C.Icon>
							<Icon title={t`divider.forDeckBox`} icon="drawer2" sx={iconSx} />
						</C.Icon>
					)}
				</Row>
			</C.Chip>
		</C.Container>
	);
}
