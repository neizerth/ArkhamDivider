import type { PropsWithChildren } from "react";
import { useAppSelector } from "@/shared/lib";
import { selectCurrentLanguage } from "../../lib";

type LocaleFragmentProps = PropsWithChildren & {
	onlyLanguages?: string[];
	exceptLanguages?: string[];
};

export function LocaleFragment({
	children,
	onlyLanguages,
	exceptLanguages,
}: LocaleFragmentProps) {
	const language = useAppSelector(selectCurrentLanguage);
	if (onlyLanguages && !onlyLanguages.includes(language)) {
		return null;
	}
	if (exceptLanguages && !exceptLanguages.includes(language)) {
		return null;
	}
	return children;
}
