import { Link as BaseLink, type LinkProps } from "react-router";
import { selectLanguage } from "@/modules/core/i18n/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { prependToPathname } from "../../../shared/lib";

export function Link(props: LinkProps) {
	const language = useAppSelector(selectLanguage);
	const to = prependToPathname(props.to, `/${language}`);

	return <BaseLink {...props} to={to} />;
}
