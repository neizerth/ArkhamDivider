import type { JSX } from "react";
import { DividerSelect } from "@/modules/divider/entities/ui";
import { DividerVariantSelect } from "@/modules/divider/entities/ui/DividerVariantSelect";
import { PrintButton } from "@/modules/print/widgets/PrintButton";
import { PrintSettings } from "@/modules/print/widgets/PrintSettings";
import * as C from "./Header.components";

type HeaderProps = JSX.IntrinsicElements["header"];

export function Header(props: HeaderProps) {
	return (
		<C.Container {...props}>
			<C.Content>
				<C.Section flex={1}>
					<C.Logo />
					<C.Section flex={1}>
						<DividerSelect />
						<DividerVariantSelect />
					</C.Section>
				</C.Section>
				<C.Section justifyContent="flex-end">
					<PrintSettings />
					<PrintButton />
				</C.Section>
			</C.Content>
		</C.Container>
	);
}
