import { Icon } from "@/components/ui/icons/Icon/Icon";
import { contacts } from "./contacts";
import S from "./Footer.module.scss";
import { useTranslation } from "react-i18next";
import { PATREON_LINK } from "@/shared/config/app";

const GAME_URL =
	"https://www.fantasyflightgames.com/en/products/arkham-horror-the-card-game/";
const FFG_URL = "https://www.fantasyflightgames.com/";

export const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className={S.container}>
			<div className={S.content}>
				<a href={GAME_URL} target="_blank">
					Arkham Horror: The Card Game™
				</a>{" "}
				and all related content ©{" "}
				<a href={FFG_URL} target="_blank">
					Fantasy Flight Games (FFG)
				</a>
				. This site is not produced, endorsed by or affiliated with FFG.
			</div>
			<div className={S.contacts}>
				<a className={S.support} href={PATREON_LINK} target="_blank">
					{t("Support project on {{platform}}", {
						platform: "Patreon",
					})}
				</a>
				<div className={S.social}>
					{contacts.map(({ icon, url }) => (
						<a href={url} target="_blank" className={S.contact} key={icon}>
							<Icon icon={icon} />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};
