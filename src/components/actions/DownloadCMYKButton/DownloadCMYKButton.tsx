// import S from './DownloadCMYKButton.module.scss';

import { createZipRenderer as createZipRenderer } from "@/shared/lib/features/zip/createZipRenderer";
import { DownloadButton } from "../DownloadButton/DownloadButton";
import { getSimilarBleed } from "@/shared/lib/features/render/getSimilarBleed";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectLayout } from "@/shared/store/features/layout/layout";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/Badge/Badge";

export type DownloadCMYKButtonProps = {};

export const DownloadCMYKButton = ({}: DownloadCMYKButtonProps) => {
	const { t } = useTranslation();

	const layout = useAppSelector(selectLayout);
	const bleed = getSimilarBleed(layout.bleed);
	const { size } = bleed;

	const bleedText = size.toFixed(1);
	const bleedTranslation = t("Bleed").toLowerCase();
	const name = `Arkham Divider (${bleedTranslation} ${bleedText}mm)`;

	const renderer = createZipRenderer({
		name,
		imageFormat: "tiff",
		colorScheme: "cmyk",
		bleed,
	});

	return (
		<DownloadButton renderer={renderer}>
			TIFF <Badge size={"small"}>zip</Badge>
		</DownloadButton>
	);
};
