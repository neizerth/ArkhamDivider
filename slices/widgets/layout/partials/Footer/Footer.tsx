import Link from "@mui/material/Link";
import type { JSX } from "react";
import { Trans } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { TextLink } from "@/shared/ui";
import { contacts } from "./contacts";
import * as C from "./Footer.components";

type FooterProps = JSX.IntrinsicElements["footer"];

export function Footer(props: FooterProps) {
	return (
		<C.Container {...props}>
			<C.Content>
				<C.Disclaimer>
					<Trans
						i18nKey="footer.disclaimer"
						components={{
							AHLCG: (
								<Link href="https://www.fantasyflightgames.com/en/products/arkham-horror-the-card-game/" />
							),
							FFG: <Link href="https://www.fantasyflightgames.com/" />,
						}}
					/>
				</C.Disclaimer>
				<C.Links>
					{contacts.map(({ icon, url }) => (
						<TextLink key={icon} href={url} target="_blank">
							<Icon icon={icon} />
						</TextLink>
					))}
				</C.Links>
			</C.Content>
		</C.Container>
	);
}
