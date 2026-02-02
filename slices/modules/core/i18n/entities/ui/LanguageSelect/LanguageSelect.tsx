import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectProps } from "@mui/material/Select";
import { useCallback, useId } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Flag } from "@/shared/ui";
import { languageLabels } from "../../../shared/config";
import {
	changeLanguage,
	selectAvailableLanguages,
	selectLanguage,
} from "../../../shared/lib/store";

type LanguageSelectProps = Omit<
	SelectProps<string>,
	"renderValue" | "onChange" | "value"
> & {
	containerProps?: FormControlProps;
};

export function LanguageSelect({
	containerProps,
	...props
}: LanguageSelectProps) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const languages = useAppSelector(selectAvailableLanguages);
	const language = useAppSelector(selectLanguage);
	const id = useId();
	const label = t(`Language`);

	const handleLanguageChange = useCallback(
		(language: string) => {
			dispatch(changeLanguage(language));
		},
		[dispatch],
	);

	return (
		<FormControl {...containerProps}>
			<InputLabel id={id}>{label}</InputLabel>
			<Select
				{...props}
				labelId={id}
				label={label}
				value={language}
				renderValue={(value: string) => {
					return languageLabels[value];
				}}
				sx={{
					width: "100%",
				}}
				onChange={(event) => {
					handleLanguageChange(event.target.value);
				}}
			>
				{languages.map((language) => (
					<MenuItem key={language} value={language}>
						<ListItemIcon>
							<Flag code={language} />
						</ListItemIcon>
						<ListItemText>{languageLabels[language]}</ListItemText>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
