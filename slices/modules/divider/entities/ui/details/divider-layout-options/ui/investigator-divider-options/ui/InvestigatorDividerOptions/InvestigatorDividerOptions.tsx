import Box, { type BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import type { GenerateDividersMode } from "@/modules/divider/shared/model";
import { selectStoriesWithInvestigators } from "@/modules/story/shared/lib";
import { StorySelect } from "@/modules/story/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";

type InvestigatorDividerOptionsProps = BoxProps;

export function InvestigatorDividerOptions(
	props: InvestigatorDividerOptionsProps,
) {
	const { t } = useTranslation();
	const stories = useAppSelector(selectStoriesWithInvestigators);
	const [selectedStoryCodes, setSelectedStoryCodes] = useState<string[]>([]);

	const onChangeStories = useCallback((codes: string[]) => {
		setSelectedStoryCodes(codes);
	}, []);

	const generate = useCallback(
		(_mode: GenerateDividersMode) => () => {
			// dispatch(generateDividers({ mode }));
		},
		[],
	);

	return (
		<Box {...props}>
			<Stack gap={2}>
				<Row gap={2} flexWrap="wrap" alignItems="center">
					<StorySelect
						fullWidth
						multiple
						stories={stories}
						value={selectedStoryCodes}
						onChange={onChangeStories}
						containerSx={{ width: "100%", flex: 1 }}
					/>
				</Row>
				{selectedStoryCodes.length > 0 && (
					<Row gap={2} alignItems="center" justifyContent="center">
						<Button
							variant="contained"
							sx={{ width: { xs: "100%", sm: "auto" } }}
							name="mode"
							type="submit"
							value="create"
							onClick={generate("create")}
						>
							<Row gap={0.5} alignItems="center">
								<Icon icon="check" />
								<span> {t("Generate")}</span>
							</Row>
						</Button>
						<Button
							variant="contained"
							sx={{ width: { xs: "100%", sm: "auto" } }}
							name="mode"
							onClick={generate("add")}
						>
							<Row gap={0.5} alignItems="center">
								<Icon icon="plus" />
								<span> {t("Add")}</span>
							</Row>
						</Button>
					</Row>
				)}
			</Stack>
		</Box>
	);
}
