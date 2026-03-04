import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { JSX } from "react";
import {
	DividerSelect,
	DividerVariantSelect,
} from "@/modules/divider/entities/ui";
import { PrintButton, PrintSettings } from "@/modules/print/widgets/ui";
import { RenderProgress } from "@/modules/render/entities/ui";
import { useDisplayOnScroll } from "@/shared/lib/hooks/ui";
import * as C from "./Header.components";

type HeaderProps = JSX.IntrinsicElements["header"] & {
	printable?: boolean;
};

export function Header({ printable, ...props }: HeaderProps) {
	const theme = useTheme();
	const mobileMedia = theme.breakpoints.down("md");
	const isXS = useMediaQuery(theme.breakpoints.only("xs"));
	const headerVisible = useDisplayOnScroll({
		offsetDown: 80,
		offsetUp: 40,
		media: mobileMedia,
	});

	return (
		<C.Container
			{...props}
			sx={{
				displayPrint: "none",
				transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
				transition: "transform 0.25s ease-in-out",
			}}
		>
			<Container sx={{ paddingInline: { xs: 1, sm: 2 } }}>
				<C.Content>
					<C.Section flex={1} gap={2}>
						<C.LogoLink to="/">
							<C.Logo />
						</C.LogoLink>
						<C.Section flex={1} gap={1}>
							<DividerSelect />
							{!isXS && printable && <DividerVariantSelect />}
						</C.Section>
					</C.Section>

					<C.SecondaryContent>
						{isXS && printable && <DividerVariantSelect />}

						<C.Section justifyContent="flex-end" sx={{ gap: { xs: 1, sm: 2 } }}>
							<PrintSettings />
							{printable && <PrintButton />}
						</C.Section>
					</C.SecondaryContent>
				</C.Content>
			</Container>

			<RenderProgress
				sx={{
					position: "absolute",
					top: "100%",
					left: 0,
					right: 0,
				}}
			/>
		</C.Container>
	);
}
