import { styled } from "@mui/material/styles";
import { Link } from "@/modules/core/router/entities/ui";
import { Logo as BaseLogo, Row } from "@/shared/ui";

export const Container = styled("header")(({ theme }) => ({
	paddingBlock: theme.spacing(2),
	boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
	position: "fixed",
	backgroundColor: theme.palette.background.paper,
	zIndex: theme.zIndex.appBar,
	width: "100%",
	top: 0,
	left: 0,
}));

export const Content = styled(Row)`
	align-items: center;
	justify-content: space-between;
	gap: ${({ theme }) => theme.spacing(2)};
	flex-wrap: wrap;
`;

export const Logo = styled(BaseLogo)`
	width: 40px;
`;

export const Section = styled(Row)`
	flex: 1;
`;

export const SecondaryContent = styled(Row)`
	flex: 1;
	justify-content: space-between;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
