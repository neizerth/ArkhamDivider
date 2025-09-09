import Link from "@mui/material/Link";
import type { JSX } from "react";
import { Trans } from "react-i18next";
import * as C from "./Footer.components";

type FooterProps = JSX.IntrinsicElements["footer"];

export function Footer(props: FooterProps) {
	return (
		<C.Container {...props}>
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
		</C.Container>
	);
}
