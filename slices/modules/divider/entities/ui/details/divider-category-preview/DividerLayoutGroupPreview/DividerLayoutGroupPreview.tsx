import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { layoutRoute } from "@/modules/core/router/entities/lib";
import type { DividerLayoutGroup } from "@/modules/divider/shared/model";
import { Row } from "@/shared/ui";
import { getBoxSize } from "@/shared/util";
import * as C from "./DividerLayoutGroupPreview.components";

type DividerLayoutGroupPreviewProps = {
	group: DividerLayoutGroup;
};

export function DividerLayoutGroupPreview({
	group,
}: DividerLayoutGroupPreviewProps) {
	const { t } = useTranslation();
	const [firstLayout] = group.layouts;
	const layoutId = firstLayout.id;
	const name = getBoxSize(group.size);
	return (
		<C.Container to={layoutRoute({ layoutId })}>
			<C.Chip gap={0.5} alignItems="center">
				<Typography variant="body2">{name}</Typography>
				<Row alignItems="center">
					{group.hasGrayscale && (
						<C.Icon title={t`divider.hasGrayscale`}>
							<ContrastOutlinedIcon />
						</C.Icon>
					)}
					{group.canBeSleeved && (
						<C.Icon title={t`divider.canBeSleeved`}>
							<ShieldOutlinedIcon />
						</C.Icon>
					)}
				</Row>
			</C.Chip>
		</C.Container>
	);
}
