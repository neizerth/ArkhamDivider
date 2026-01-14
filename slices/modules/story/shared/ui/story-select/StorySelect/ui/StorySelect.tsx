import type {
	AutocompleteProps,
	AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import type { SxProps, Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
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

type StorySelectProps = Omit<
	BaseSelectProps,
	"options" | "renderInput" | "renderOption" | "renderValue"
> & {
	containerSx?: SxProps<Theme>;
	controlSx?: SxProps<Theme>;
	stories: Story[];
	nullable?: boolean;
};

export function StorySelect({
	stories,
	containerSx = {},
	controlSx = {},
	...props
}: StorySelectProps) {
	const options = useStoryData(stories);

	const { t } = useTranslation();
	const label = t("Select Campaign");

	const renderInput = useCallback(
		(props: AutocompleteRenderInputParams) => {
			return <TextField {...props} label={label} />;
		},
		[label],
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
					options={options}
					renderInput={renderInput}
					renderOption={renderOption}
					renderValue={renderItem}
					groupBy={prop("group")}
					getOptionLabel={prop("name")}
				/>
			</FormControl>
		</Row>
	);
}
