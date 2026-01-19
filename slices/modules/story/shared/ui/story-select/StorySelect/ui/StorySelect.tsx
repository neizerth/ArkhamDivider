import type { AutocompleteProps } from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import type { SxProps, Theme } from "@mui/material/styles";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { prop } from "ramda";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { OfficialIcon } from "@/modules/core/icon/entities/ui";
import { Icon } from "@/modules/core/icon/shared/ui";
import type { Defined } from "@/shared/model";
import { Row } from "@/shared/ui";
import type { Story } from "../../../../model";
import { useStoryData } from "../lib";

type SelectItem = Story & {
	group: string;
	translated: boolean;
};

type BaseSelectProps = AutocompleteProps<SelectItem, false, false, false>;

type RenderOption = Defined<BaseSelectProps["renderOption"]>;

type OnChange = Defined<BaseSelectProps["onChange"]>;

type StorySelectProps = Omit<
	BaseSelectProps,
	| "options"
	| "renderInput"
	| "renderOption"
	| "renderValue"
	| "onChange"
	| "value"
> & {
	value?: string | null;
	containerSx?: SxProps<Theme>;
	controlSx?: SxProps<Theme>;
	stories: Story[];
	nullable?: boolean;
	onChange?: (code: string | null) => void;
};

export function StorySelect({
	stories,
	containerSx,
	controlSx,
	onChange: onChangeProp,
	value: valueProp,
	...props
}: StorySelectProps) {
	const options = useStoryData(stories);

	const value = options.find((option) => option.code === valueProp) || null;

	const { t } = useTranslation();
	const label = t("Select Campaign");

	const renderInput = useCallback(
		(props: TextFieldProps) => {
			return <TextField {...props} label={label} />;
		},
		[label],
	);

	const onChange: OnChange = useCallback(
		(_, value) => {
			const code = value?.code ?? null;
			onChangeProp?.(code);
		},
		[onChangeProp],
	);

	const renderItem = useCallback((story: SelectItem) => {
		return (
			<Row alignItems="center" gap={1}>
				<Row width={36} justifyContent="center" alignItems="center">
					{story.icon && <Icon icon={story.icon} />}
				</Row>
				<Typography>{story.name}</Typography>

				{story.is_official && (
					<Row
						justifyContent="center"
						alignItems="center"
						sx={{ color: "palette.primary" }}
					>
						<OfficialIcon />
					</Row>
				)}
				{!story.translated && (
					<Row justifyContent="center" alignItems="center">
						<Icon icon="en" />
					</Row>
				)}
			</Row>
		);
	}, []);

	const renderOption: RenderOption = useCallback(
		(props, story) => {
			return (
				<li {...props} key={story.code}>
					{renderItem(story)}
				</li>
			);
		},
		[renderItem],
	);

	return (
		<Row sx={containerSx}>
			<FormControl sx={{ width: "100%", ...controlSx }}>
				<Autocomplete
					{...props}
					sx={{
						minWidth: 280,
					}}
					options={options}
					value={value}
					renderInput={renderInput}
					renderOption={renderOption}
					renderValue={renderItem}
					groupBy={prop("group")}
					onChange={onChange}
					getOptionLabel={prop("name")}
					openOnFocus
				/>
			</FormControl>
		</Row>
	);
}
