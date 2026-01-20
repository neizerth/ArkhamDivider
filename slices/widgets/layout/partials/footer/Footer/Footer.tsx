import Container from "@mui/material/Container";
import type { JSX } from "react";
import { Trans } from "react-i18next";
import { TextLink } from "@/shared/ui";
import { FooterMenu } from "../FooterMenu";
import { ProjectLinks } from "../ProjectLinks";
import * as C from "./Footer.components";

type FooterProps = JSX.IntrinsicElements["footer"];

export function Footer(props: FooterProps) {
	return (
		<C.Container {...props} sx={{ displayPrint: "none" }}>
			<Container>
				<C.Content>
					<C.Disclaimer>
						<Trans
							i18nKey="footer.disclaimer"
							components={{
								AHLCG: (
									<TextLink href="https://www.fantasyflightgames.com/en/products/arkham-horror-the-card-game/" />
								),
								FFG: <TextLink href="https://www.fantasyflightgames.com/" />,
							}}
						/>
					</C.Disclaimer>
					<C.Right>
						<FooterMenu />
						<ProjectLinks />
					</C.Right>
				</C.Content>
			</Container>
		</C.Container>
	);
}
