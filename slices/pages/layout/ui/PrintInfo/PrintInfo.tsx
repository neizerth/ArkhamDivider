import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { selectOrientedPageFormat } from "@/modules/print/shared/lib";
import {
	selectBleedEnabled,
	selectDoubleSidePrintEnabled,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib/store/print";
import { browser } from "@/shared/config/compatibility";
import { useAppSelector } from "@/shared/lib";

const A4_AREA_MM2 = 210 * 297;

function isBiggerThanA4Mm(size: { width: number; height: number }): boolean {
	return size.width * size.height > A4_AREA_MM2;
}

export function PrintInfo() {
	const { t } = useTranslation();
	const bleedEnabled = useAppSelector(selectBleedEnabled);
	const doubleSided = useAppSelector(selectDoubleSidePrintEnabled);
	const singleItemPerPage = useAppSelector(selectSingleItemPerPage);
	const pageFormat = useAppSelector(selectOrientedPageFormat);

	const showDoubleSidedWithoutBleed =
		bleedEnabled === false && doubleSided === true;

	const isFirefox = browser?.name === "firefox";
	const showFirefoxLargePaperInfo =
		isFirefox && pageFormat ? isBiggerThanA4Mm(pageFormat.size.mm) : false;

	const showSingleItemPerPageInfo = singleItemPerPage === true;

	if (
		!showDoubleSidedWithoutBleed &&
		!showFirefoxLargePaperInfo &&
		!showSingleItemPerPageInfo
	) {
		return null;
	}

	return (
		<Stack gap={1.5} maxWidth="sm" marginInline="auto">
			{showDoubleSidedWithoutBleed && (
				<Accordion
					defaultExpanded
					sx={{
						border: "1px solid",
						borderColor: "warning.light",
						"&:before": { display: "none" },
					}}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Stack direction="row" alignItems="center" gap={1}>
							<WarningAmberOutlinedIcon color="warning" fontSize="small" />
							<Typography fontWeight={600}>
								{t("printInfo.doubleSidedNoBleed.title")}
							</Typography>
						</Stack>
					</AccordionSummary>
					<AccordionDetails>
						<Alert severity="warning" variant="outlined" icon={false}>
							{t("printInfo.doubleSidedNoBleed.body")}
						</Alert>
					</AccordionDetails>
				</Accordion>
			)}

			{showFirefoxLargePaperInfo && (
				<Accordion
					defaultExpanded
					sx={{
						border: "1px solid",
						borderColor: "warning.light",
						"&:before": { display: "none" },
					}}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Stack direction="row" alignItems="center" gap={1}>
							<WarningAmberOutlinedIcon color="warning" fontSize="small" />
							<Typography fontWeight={600}>
								{t("printInfo.firefoxLargePaper.title")}
							</Typography>
						</Stack>
					</AccordionSummary>
					<AccordionDetails>
						<Alert severity="warning" variant="outlined" icon={false}>
							{t("printInfo.firefoxLargePaper.body")}
						</Alert>
					</AccordionDetails>
				</Accordion>
			)}

			{showSingleItemPerPageInfo && (
				<Accordion
					defaultExpanded
					sx={{
						border: "1px solid",
						borderColor: "warning.light",
						"&:before": { display: "none" },
					}}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Stack direction="row" alignItems="center" gap={1}>
							<WarningAmberOutlinedIcon color="warning" fontSize="small" />
							<Typography fontWeight={600}>
								{t("printInfo.singleItemPerPage.title")}
							</Typography>
						</Stack>
					</AccordionSummary>
					<AccordionDetails>
						<Alert severity="warning" variant="outlined" icon={false}>
							{t("printInfo.singleItemPerPage.body")}
						</Alert>
					</AccordionDetails>
				</Accordion>
			)}
		</Stack>
	);
}
