import { LayoutZoom, Row } from "@/components";
import { DownloadCMYKButton } from "@/widgets/download/ui/DownloadCMYKButton/DownloadCMYKButton";
import { DownloadPNGButton } from "@/widgets/download/ui/DownloadPNGButton/DownloadPNGButton";
import { CornerRadiusSettings } from "../CornerRadiusSettings/CornerRadiusSettings";
import { PageSizeSettings } from "../PageSizeSettings/PageSizeSettings";
import S from "./AdditionalSettings.module.scss";
import { DownloadLasercutPDFButton } from "@/widgets";

export type AdditionalSettingsProps = {};

export const AdditionalSettings = ({}: AdditionalSettingsProps) => {
	return (
		<div className={S.container}>
			<Row gap="responsive" className={S.row} wrap={true}>
				<div className={S.item}>
					<LayoutZoom />
				</div>
				<div className={S.item}>
					<PageSizeSettings />
				</div>
				<div className={S.item}>
					<CornerRadiusSettings />
				</div>
				<div className={S.item}>
					<DownloadLasercutPDFButton />
				</div>
				<div className={S.item}>
					<DownloadCMYKButton />
				</div>
				<div className={S.item}>
					<DownloadPNGButton />
				</div>
			</Row>
			<div className={S.shadow} />
		</div>
	);
};
