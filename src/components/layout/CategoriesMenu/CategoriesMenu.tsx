import { useTranslation } from "react-i18next";
import S from "./CategoriesMenu.module.scss";

export type CategoriesMenuProps = {};

export const CategoriesMenu = ({}: CategoriesMenuProps) => {
	const { t } = useTranslation();

	return (
		<div className={S.container}>
			<a href={"/campaigns"}>{t("Campaigns")}</a>
			<a href={"/investigators"}>{t("Investigators")}</a>
			<a href={"/player-cards"}>{t("Player Cards")}</a>
		</div>
	);
};
