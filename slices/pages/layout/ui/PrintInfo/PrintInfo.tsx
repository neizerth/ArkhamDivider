import Stack from "@mui/material/Stack";
import { isFalse } from "ramda-adjunct";
import { useTranslation } from "react-i18next";
import { selectCategory, selectLayout } from "@/modules/divider/entities/lib";
import { selectScenarioParams } from "@/modules/divider/shared/lib";
import { selectOrientedPageFormat } from "@/modules/print/shared/lib";
import {
	selectBleedEnabled,
	selectDoubleSidePrintEnabled,
	selectLasercutEnabled,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib/store/print";
import { browser } from "@/shared/config/compatibility";
import { useAppSelector } from "@/shared/lib";
import { PrintInfoEntry } from "./PrintInfoEntry";

const A4_AREA_MM2 = 210 * 297;

function isBiggerThanA4Mm(size: { width: number; height: number }): boolean {
	return size.width * size.height > A4_AREA_MM2;
}

export function PrintInfo() {
	const { t } = useTranslation();
	const bleedEnabled = useAppSelector(selectBleedEnabled);
	const doubleSided = useAppSelector(selectDoubleSidePrintEnabled);
	const lasercutEnabled = useAppSelector(selectLasercutEnabled);

	const singleItemPerPage = useAppSelector(selectSingleItemPerPage);
	const pageFormat = useAppSelector(selectOrientedPageFormat);
	const category = useAppSelector(selectCategory);
	const layout = useAppSelector(selectLayout);
	const layoutSizeSupport = layout?.scenarioParams?.cardsCount === true;
	const { encounterSize, scenarioSize, campaignSize } =
		useAppSelector(selectScenarioParams);

	const showDoubleSidedWithoutBleed =
		bleedEnabled === false && doubleSided === true;

	const isFirefox = browser?.name === "firefox";
	const showFirefoxLargePaperInfo =
		isFirefox && pageFormat ? isBiggerThanA4Mm(pageFormat.size.mm) : false;
	const showSingleItemPerPageInfo = singleItemPerPage === true;
	const isSticker = category?.type === "sticker";
	const hasTabs = Boolean(layout?.tabs) && !lasercutEnabled;

	const showSize =
		layoutSizeSupport &&
		(encounterSize === true || scenarioSize === true || campaignSize === true);

	const conditions = [
		showDoubleSidedWithoutBleed,
		showFirefoxLargePaperInfo,
		showSingleItemPerPageInfo,
		isSticker,
		hasTabs,
		showSize,
	];

	const hideContent = conditions.every(isFalse);

	if (hideContent) {
		return null;
	}

	return (
		<Stack gap={1.5} maxWidth="sm" marginInline="auto">
			{showDoubleSidedWithoutBleed && (
				<PrintInfoEntry title={t("printInfo.doubleSidedNoBleed.title")}>
					{t("printInfo.doubleSidedNoBleed.body")}
				</PrintInfoEntry>
			)}

			{showFirefoxLargePaperInfo && (
				<PrintInfoEntry title={t("printInfo.firefoxLargePaper.title")}>
					{t("printInfo.firefoxLargePaper.body")}
				</PrintInfoEntry>
			)}

			{showSingleItemPerPageInfo && (
				<PrintInfoEntry title={t("printInfo.singleItemPerPage.title")}>
					{t("printInfo.singleItemPerPage.body")}
				</PrintInfoEntry>
			)}
			{isSticker && (
				<PrintInfoEntry title={t("printInfo.sticker.title")}>
					{t("printInfo.sticker.body")}
				</PrintInfoEntry>
			)}
			{hasTabs && (
				<PrintInfoEntry title={t("printInfo.tabs.title")}>
					{t("printInfo.tabs.body")}
				</PrintInfoEntry>
			)}
			{showSize && (
				<PrintInfoEntry title={t("printInfo.size.title")}>
					{t("printInfo.size.body")}
				</PrintInfoEntry>
			)}
		</Stack>
	);
}
