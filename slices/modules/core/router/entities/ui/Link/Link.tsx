import { styled } from "@mui/material/styles";
import type { ComponentProps } from "react";
import { Link as RouterLink } from "react-router";
import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { prependToPathname } from "../../../shared/lib";

const BaseLink = styled(RouterLink)`
`;

export type LinkProps = ComponentProps<typeof BaseLink>;

export function Link(props: LinkProps) {
	const language = useAppSelector(selectCurrentLanguage);
	const to = prependToPathname(props.to, `/${language}`);

	return <BaseLink {...props} to={to} />;
}
