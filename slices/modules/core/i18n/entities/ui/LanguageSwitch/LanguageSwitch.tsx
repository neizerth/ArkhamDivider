import type { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import {
	selectAvailableLanguages,
	selectLanguage,
} from "../../../shared/store";
import * as C from "./LanguageSwitch.components";

export function LanguageSwitch() {
	const language = useSelector(selectLanguage);
	const languages = useSelector(selectAvailableLanguages);

	const options = languages.map((lang) => ({
		label: lang,
		id: lang,
	}));

	const renderInput = (props: AutocompleteRenderInputParams) => {
		return (
			<C.InputContainer>
				<C.FlagContainer>
					<C.Flag code={language} />
				</C.FlagContainer>
				<C.Input {...props} variant="filled" />
			</C.InputContainer>
		);
	};

	return <C.Container options={options} renderInput={renderInput} />;
}
