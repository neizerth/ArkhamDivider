import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { Separator } from "@/shared/ui";
import * as C from "./FooterMenu.components";

type FooterMenuProps = JSX.IntrinsicElements["nav"];

export function FooterMenu(props: FooterMenuProps) {
	const { t } = useTranslation();
	return (
		<C.Container {...props}>
			<C.Item to="/about">{t("About")}</C.Item>
			<Separator />
			<C.Item to="/how-to-print">{t("How to print")}</C.Item>
		</C.Container>
	);
}
