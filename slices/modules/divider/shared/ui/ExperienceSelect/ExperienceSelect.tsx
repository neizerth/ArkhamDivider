import Box, { type BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { isNumber } from "ramda-adjunct";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { Row } from "@/shared/ui";
import { fixedXPCosts } from "../../config";
import { getXPRangeName } from "../../lib";
import type { XPCost } from "../../model";

type ExperienceSelectProps = Omit<BoxProps, "onChange"> & {
	value: XPCost[];
	onChange: (value: XPCost[]) => void;
};

const fixedMarks = fixedXPCosts.map((cost) => {
	return {
		value: cost.value,
		label: cost.name,
	};
});

export function ExperienceSelect({
	value,
	onChange,
	...props
}: ExperienceSelectProps) {
	const { t } = useTranslation();
	const label = t("Experience");
	const [rangeValue, setRangeValue] = useState<number[]>([0, 5]);

	const handleRangeChange = useCallback(
		(_: Event, value: number | number[]) => {
			if (isNumber(value)) {
				return;
			}
			setRangeValue(value);
		},
		[],
	);

	const handleRangeAdd = useCallback(() => {
		const [min, max] = rangeValue;
		const fixed = min === max;
		const name = getXPRangeName(min, max);
		const cost: XPCost = fixed
			? {
					type: "fixed",
					name,
					value: min,
				}
			: {
					type: "range",
					name,
					min,
					max,
				};

		onChange([...value, cost]);
	}, [rangeValue, onChange, value]);

	const handleRangeRemove = useCallback(
		(index: number) => {
			onChange(value.filter((_, i) => i !== index));
		},
		[onChange, value],
	);

	return (
		<Box {...props} width="100%">
			<Box
				display="flex"
				sx={{
					flexDirection: {
						xs: "column",
						sm: "row",
					},
					alignItems: {
						xs: "center",
						sm: "flex-start",
					},
					gap: {
						xs: 0,
						md: 1,
					},
				}}
				alignItems="flex-start"
				justifyContent="center"
				gap={1}
			>
				<Typography paddingBlock={1} variant="body1">
					{label}
				</Typography>
				<Stack gap={2} flex={1} maxWidth={600}>
					<Row
						sx={{
							gap: {
								xs: 1,
								md: 0,
							},
						}}
						flexWrap="wrap"
						alignItems="flex-start"
						justifyContent="center"
					>
						<Box paddingInline={2} flex={1} minWidth={300}>
							<Slider
								value={rangeValue}
								min={0}
								max={5}
								marks={fixedMarks}
								onChange={handleRangeChange}
							/>
						</Box>
						<Box paddingTop={0.7}>
							<Button
								variant="contained"
								color="primary"
								onClick={handleRangeAdd}
							>
								<Row gap={0.5} alignItems="center">
									<Icon icon={`plus`} />
									<Box sx={{ display: { xs: "inline-block", sm: "none" } }}>
										{t("Add")}
									</Box>
								</Row>
							</Button>
						</Box>
					</Row>
					{value.length > 0 && (
						<Row
							gap={1}
							sx={{
								"@media (max-width: 499px)": {
									order: -1,
								},
							}}
							paddingInline={1.5}
						>
							{value.map((range, index) => (
								<Chip
									key={range.name}
									label={range.name}
									color="primary"
									clickable
									onClick={() => handleRangeRemove(index)}
								/>
							))}
						</Row>
					)}
				</Stack>
			</Box>
		</Box>
	);
}
