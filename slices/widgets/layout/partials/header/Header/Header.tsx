import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { JSX } from "react";
import { DividerSelect } from "@/modules/divider/entities/ui";
import { DividerVariantSelect } from "@/modules/divider/entities/ui/DividerVariantSelect";
import { PrintButton } from "@/modules/print/widgets/PrintButton";
import { PrintSettings } from "@/modules/print/widgets/PrintSettings";
import * as C from "./Header.components";

type HeaderProps = JSX.IntrinsicElements["header"];

export function Header(props: HeaderProps) {
	const theme = useTheme();

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<C.Container {...props}>
			<Container>
				<C.Content>
					<C.Section flex={1} gap={2}>
						<C.Logo />
						<C.Section flex={1} gap={1}>
							<DividerSelect />
							{!isMobile && <DividerVariantSelect />}
						</C.Section>
					</C.Section>

					<C.SecondaryContent>
						{isMobile && <DividerVariantSelect />}
						<C.Section justifyContent="flex-end" sx={{ gap: { xs: 1, sm: 2 } }}>
							<PrintSettings />
							<PrintButton />
						</C.Section>
					</C.SecondaryContent>
				</C.Content>
			</Container>
		</C.Container>
	);
}
