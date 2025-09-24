import { styled } from "@mui/material/styles";
import { Row } from "@/shared/ui";

export const Container = styled("nav")`
  display: flex;
  flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: ${({ theme }) => theme.spacing(2)};
`;

export const Links = styled(Row)(({ theme }) => ({
	flexWrap: "wrap",
	justifyContent: "center",
	gap: theme.spacing(2),
	fontSize: "1.5rem",
	lineHeight: 1,
}));
