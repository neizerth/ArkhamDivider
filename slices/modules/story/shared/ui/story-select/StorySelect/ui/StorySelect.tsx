import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import type { SelectProps } from "@mui/material/Select";
import Select from "@mui/material/Select";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type ReactNode, useId } from "react";
import { useTranslation } from "react-i18next";
import { OfficialIcon } from "@/modules/core/icon/entities/ui";
import { Icon } from "@/modules/core/icon/shared/ui";
import { Row } from "@/shared/ui";
import type { Story } from "../../../../model";
import { useStoryGroups } from "../lib";

type StorySelectProps = SelectProps & {
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
	const groups = useStoryGroups(stories);
	const { t } = useTranslation();
	const id = useId();
	const label = t("Select Campaign");
	return (
		<Row sx={containerSx}>
			<FormControl sx={{ width: "100%", ...controlSx }}>
				<InputLabel id={id}>{label}</InputLabel>
				<Select {...props} labelId={id} label={label}>
					{groups.reduce((target, group) => {
						const header = (
							<ListSubheader key={group.id}>{t(group.label)}</ListSubheader>
						);

						const items = group.stories.map((story) => (
							<MenuItem key={story.code} value={story.code}>
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
							</MenuItem>
						));

						target.push(header, ...items);

						return target;
					}, [] as ReactNode[])}
				</Select>
			</FormControl>
		</Row>
	);
}
