import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import type { SxProps, Theme } from "@mui/material/styles";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { prop } from "ramda";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Defined } from "@/shared/model";
import { Row } from "@/shared/ui";
import type { Story } from "../../../../model";
import { useStoryData } from "../lib";
import type { BaseSelectProps, SelectRenderValueCallback } from "../model";
import { renderGroup } from "./renderGroup";
import { renderOption } from "./renderOption";
import { renderStory } from "./renderStory";

type OnChange = Defined<BaseSelectProps["onChange"]>;

type StorySelectProps = Omit<
	BaseSelectProps,
	| "options"
	| "renderInput"
	| "renderOption"
	| "renderValue"
	| "onChange"
	| "value"
	| "multiple"
> & {
	containerSx?: SxProps<Theme>;
	controlSx?: SxProps<Theme>;
	stories: Story[];
	nullable?: boolean;
} & (
		| {
				multiple?: false;
				value?: string | null;
				onChange?: (code: string | null) => void;
		  }
		| {
				multiple: true;
				value?: string[];
				onChange?: (codes: string[]) => void;
		  }
	);

export function StorySelect({
	stories,
	containerSx,
	controlSx,
	value: valueProp,
	...props
}: StorySelectProps) {
	const options = useStoryData(stories);

	const codes = Array.isArray(valueProp)
		? valueProp
		: valueProp != null
			? [valueProp]
			: [];
	const value = props.multiple
		? options.filter((option) => codes.includes(option.code))
		: options.find((option) => option.code === valueProp) || null;

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
			if (props.multiple && Array.isArray(value)) {
				props.onChange?.(value.map(prop("code")));
			} else if (!props.multiple && !Array.isArray(value)) {
				props.onChange?.(value?.code ?? null);
			}
		},
		[props.onChange, props.multiple],
	);

	const renderItem = useCallback<SelectRenderValueCallback>(
		(value, getItemProps) => {
			if (Array.isArray(value)) {
				return value.map((item) => renderStory(item, getItemProps));
			}
			return renderStory(value, getItemProps);
		},
		[],
	);

	const renderGroupProps = useMemo(() => {
		if (!props.multiple) {
			return;
		}
		const optionsList = options;
		return {
			t,
			selectable: true,
			onSelectAll: (group: string) => {
				const groupCodes = optionsList
					.filter((o) => o.group === group)
					.map((o) => o.code);
				const current = (valueProp ?? []) as string[];
				const next = [...new Set([...current, ...groupCodes])];
				props.onChange?.(next);
			},
			onSelectNone: (group: string) => {
				const groupCodes = optionsList
					.filter((o) => o.group === group)
					.map((o) => o.code);
				const current = (valueProp ?? []) as string[];
				const next = current.filter((c) => !groupCodes.includes(c));
				props.onChange?.(next);
			},
		};
	}, [props.multiple, props.onChange, options, valueProp, t]);

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
					disableCloseOnSelect={props.multiple}
					renderInput={renderInput}
					renderOption={renderOption}
					renderValue={renderItem}
					renderGroup={renderGroup(renderGroupProps)}
					groupBy={prop("group")}
					onChange={onChange}
					getOptionLabel={prop("name")}
					openOnFocus
				/>
			</FormControl>
		</Row>
	);
}
