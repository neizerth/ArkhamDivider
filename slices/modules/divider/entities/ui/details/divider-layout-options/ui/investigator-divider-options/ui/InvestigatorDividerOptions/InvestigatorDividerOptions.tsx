import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { generateInvestigatorDividers } from "@/modules/divider/entities/lib/store/features/generateInvestigatorDividers";
import {
	deleteAllDividers,
	selectInvestigatorParams,
	setInvestigatorParams,
} from "@/modules/divider/shared/lib";
import type {
	GenerateDividersMode,
	InvestigatorDividerParams,
} from "@/modules/divider/shared/model";
import { selectInvestigatorStories } from "@/modules/story/shared/lib";
import { StorySelect } from "@/modules/story/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";
import { preventDefault } from "@/shared/util";
import { formButtonSx } from "../../../DividerLayoutOptions/DividerLayoutOptions.styles";
import * as C from "./InvestigatorDividerOptions.components";

type InvestigatorDividerOptionsProps = BoxProps;

export function InvestigatorDividerOptions(
	props: InvestigatorDividerOptionsProps,
) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const defaultValues = useAppSelector(selectInvestigatorParams);
	const stories = useAppSelector(selectInvestigatorStories);

	const { getValues, setValue, watch } = useForm<InvestigatorDividerParams>({
		defaultValues,
	});

	useEffect(() => {
		dispatch(setInvestigatorParams(getValues()));
		const subscription = watch((data) =>
			dispatch(setInvestigatorParams(data as InvestigatorDividerParams)),
		);
		return () => subscription.unsubscribe();
	}, [watch, getValues, dispatch]);

	const selectedStoryCodes = getValues("storyCodes") ?? [];

	const onChangeStories = useCallback(
		(storyCodes: string[]) => {
			setValue("storyCodes", storyCodes);
		},
		[setValue],
	);

	const generate = useCallback(
		(mode: GenerateDividersMode) => () => {
			const params = getValues();
			dispatch(
				generateInvestigatorDividers({
					...params,
					mode,
				}),
			);
		},
		[dispatch, getValues],
	);

	const clear = useCallback(() => {
		dispatch(deleteAllDividers());
	}, [dispatch]);

	const showGenerateButtons = selectedStoryCodes.length > 0;

	return (
		<Box {...props}>
			<form onSubmit={preventDefault}>
				<Row gap={2} flexWrap="wrap" alignItems="center">
					<C.Row flex={1} minWidth={300}>
						<StorySelect
							fullWidth
							multiple
							stories={stories}
							value={selectedStoryCodes}
							onChange={onChangeStories}
							containerSx={{ width: "100%", flex: 1 }}
						/>
					</C.Row>
					{showGenerateButtons && (
						<C.Row
							sx={{
								flex: { xs: 1, sm: 0 },
								justifyContent: {
									xs: "center",
									sm: "flex-start",
								},
							}}
						>
							<Row
								flexWrap={{ xs: "wrap", sm: "nowrap" }}
								sx={{
									gap: 2,
									alignItems: "center",
									justifyContent: {
										xs: "center",
										sm: "flex-start",
									},
									flex: { xs: 1, sm: 0 },
								}}
							>
								<Button
									variant="contained"
									sx={formButtonSx}
									onClick={clear}
									color="error"
								>
									<Row gap={0.5} alignItems="center">
										<Icon icon="trash" />
										<span> {t("Clear")}</span>
									</Row>
								</Button>
								<Button
									variant="contained"
									sx={formButtonSx}
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
									sx={formButtonSx}
									name="mode"
									onClick={generate("add")}
								>
									<Row gap={0.5} alignItems="center">
										<Icon icon="plus" />
										<span> {t("Add")}</span>
									</Row>
								</Button>
							</Row>
						</C.Row>
					)}
				</Row>
			</form>
		</Box>
	);
}
