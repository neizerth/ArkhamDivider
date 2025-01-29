import { CHINA_LANGUAGES } from "@/shared/config/i18n";
import countries from "@/shared/data/countries.json";
import type { PropsWithClassName } from "@/shared/model/types/util";
import classNames from "classnames";
import { propEq } from "ramda";
import { Flag } from "../Flag/Flag";
import S from "./LanguageFlag.module.scss";
import languageMapping from "./languageMapping.json";

export type LanguageFlagProps = PropsWithClassName & {
	imageClassName?: string;
	altClassName?: string;
	displayTitle?: boolean;
	language: string;
};

export const LanguageFlag = ({
	className,
	imageClassName,
	altClassName,
	displayTitle = true,
	language,
}: LanguageFlagProps) => {
	const isChina = CHINA_LANGUAGES.includes(language);

	const mappingItem = languageMapping.find(propEq(language, "language"));
	const country = mappingItem?.country;
	const code = country || language.toUpperCase();

	const hasFlag = countries.includes(code);
	const classList = classNames(S.image, imageClassName);
	return (
		<div className={classNames(S.container, className)} title={language}>
			{hasFlag && <Flag className={classList} code={code} />}
			{isChina && <Flag className={classList} code={"cn"} />}
			{!hasFlag && displayTitle && (
				<span className={classNames(S.alt, altClassName)}>{language}</span>
			)}
		</div>
	);
};
