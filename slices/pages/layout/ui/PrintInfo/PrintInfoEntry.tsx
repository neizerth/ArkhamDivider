import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

export type PrintInfoEntryProps = {
	title: ReactNode;
	children: ReactNode;
};

export function PrintInfoEntry({ title, children }: PrintInfoEntryProps) {
	return (
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
					<Typography component="div" fontWeight={600}>
						{title}
					</Typography>
				</Stack>
			</AccordionSummary>
			<AccordionDetails>
				<Alert severity="warning" variant="outlined" icon={false}>
					{children}
				</Alert>
			</AccordionDetails>
		</Accordion>
	);
}
