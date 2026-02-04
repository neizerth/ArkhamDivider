import type { AutocompleteRenderValueGetItemProps } from "@mui/material/Autocomplete";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { OfficialIcon } from "@/modules/core/icon/entities/ui";
import { Icon } from "@/modules/core/icon/shared/ui";
import { Row } from "@/shared/ui";
import type { Story } from "../../../../model";

type SelectItem = Story & {
	group: string;
	translated: boolean;
};

export const renderStory = (
	story: SelectItem,
	getItemProps?: AutocompleteRenderValueGetItemProps<boolean>,
	index = 0,
) => {
	const itemProps = getItemProps?.({ index });
	const { onDelete, ...restItemProps } = itemProps ?? {};
	const canDelete = Boolean(onDelete);
	const activeSx: SxProps = canDelete
		? {
				cursor: "pointer",
				border: {
					sm: "1px solid rgba(0, 0, 0, 0.2)",
				},
				"&:hover": {
					backgroundColor: "rgba(255, 233, 173, 0.2)",
				},
			}
		: {};
	return (
		<Row
			{...restItemProps}
			key={story.code}
			alignItems="center"
			gap={1}
			onClick={onDelete}
			minHeight={"1.5em"}
			paddingRight={1}
			paddingBlock={0.5}
			borderRadius={1}
			sx={{
				...activeSx,
			}}
		>
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
};
