import { styled } from "@mui/material/styles";
import { LanguageSwitch } from "@/modules/core/i18n/entities/ui";
import { Logo as BaseLogo, Row } from "@/shared/ui";

export const Container = styled("header")(({ theme }) => ({
	paddingInline: theme.spacing(2),
	paddingBlock: theme.spacing(1),
	boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
}));

export const Content = styled(Row)(({ theme }) => ({
	gap: theme.spacing(1),
	alignItems: "center",
}));

export const Logo = styled(BaseLogo)`
	width: 50px;
`;

export const Language = styled(LanguageSwitch)``;
