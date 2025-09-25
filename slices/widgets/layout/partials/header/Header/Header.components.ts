import { styled } from "@mui/material/styles";
import { Logo as BaseLogo, Row } from "@/shared/ui";

export const Container = styled("header")(({ theme }) => ({
	paddingInline: theme.spacing(2),
	paddingBlock: theme.spacing(1),
	boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
}));

export const Content = styled(Row)`
	align-items: center;
	justify-content: space-between;
	gap: ${({ theme }) => theme.spacing(1)};
	flex-wrap: wrap;
`;

export const Logo = styled(BaseLogo)`
	width: 40px;
`;

export const Section = styled(Row)`
	gap: ${({ theme }) => theme.spacing(1)};
`;
