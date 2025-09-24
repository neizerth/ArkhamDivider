import type { JSX } from "react";
import { Icon } from "@/modules/core/icon/shared/ui";
import { Separator, TextLink } from "@/shared/ui";
import { contacts, donations } from "./links";
import * as C from "./ProjectLinks.components";

type ProjectLinksProps = JSX.IntrinsicElements["nav"];

export function ProjectLinks(props: ProjectLinksProps) {
	return (
		<C.Container {...props}>
			<C.Links>
				{donations.map(({ icon, url }) => (
					<TextLink key={icon} href={url} target="_blank" underline={"none"}>
						<Icon icon={icon} />
					</TextLink>
				))}
			</C.Links>
			<Separator />
			<C.Links>
				{contacts.map(({ icon, url }) => (
					<TextLink key={icon} href={url} target="_blank" underline={"none"}>
						<Icon icon={icon} />
					</TextLink>
				))}
			</C.Links>
		</C.Container>
	);
}
