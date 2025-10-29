import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { layoutRoute } from "@/modules/core/router/entities/lib";
import type { LayoutGroup } from "@/modules/divider/shared/model";
import { Row } from "@/shared/ui";
import * as C from "./DividerLayoutGroupPreview.components";

type DividerLayoutGroupPreviewProps = {
	group: LayoutGroup;
};

export function DividerLayoutGroupPreview({
	group,
}: DividerLayoutGroupPreviewProps) {
	const { t } = useTranslation();
	const [firstLayout] = group.layouts;
	const name = `${group.size.width}x${group.size.height}`;
	return (
		<C.Container to={layoutRoute(firstLayout.id)}>
			<C.Chip gap={1} alignItems="center">
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
