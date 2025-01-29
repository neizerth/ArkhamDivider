import { LanguageFlag } from "@/components/ui/LanguageFlag/LanguageFlag";
import { useAppNavigate } from "@/shared/lib/hooks/useAppNavigate";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import {
	selectAvailableLanguages,
	selectLanguage,
} from "@/shared/lib/store/features/language/language";
import Select, {
	type OptionProps,
	type SingleValueProps,
	components,
} from "react-select";
import S from "./LanguageSelect.module.scss";

export const LanguageSelectSingleValue = (
	props: SingleValueProps<{
		label: string;
		value: string;
	}>,
) => {
	const { value } = props.data;
	return (
		<components.SingleValue {...props}>
			<div className={S.value}>
				<LanguageFlag
					displayTitle={false}
					language={value}
					imageClassName={S.flag}
				/>
			</div>
		</components.SingleValue>
	);
};

export const LanguageSelectOption = (
	props: OptionProps<{
		label: string;
		value: string;
	}>,
) => {
	const { value } = props.data;
	return (
		<components.Option {...props}>
			<div className={S.value}>
				<LanguageFlag language={value} imageClassName={S.flag} />
			</div>
		</components.Option>
	);
};

export const LanguageSelect = () => {
	const availableLanguages = useAppSelector(selectAvailableLanguages);
	const language = useAppSelector(selectLanguage);

	const navigate = useAppNavigate();

	const changeCurrentLanguage = (language: string) => {
		navigate({ language });
	};

	const options = availableLanguages.map((value) => ({
		value,
		label: value,
	}));

	const languageValue = {
		value: language,
		label: language,
	};

	const components = {
		Option: LanguageSelectOption,
		SingleValue: LanguageSelectSingleValue,
	};

	return (
		<Select
			className={S.container}
			options={options}
			value={languageValue}
			components={components}
			isMulti={false}
			onChange={(item) => item && changeCurrentLanguage(item.value)}
		/>
	);
};
