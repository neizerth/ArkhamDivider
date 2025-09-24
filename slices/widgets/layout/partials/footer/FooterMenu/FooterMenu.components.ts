import { styled } from "@mui/material/styles";
import { Link } from "react-router";

export const Container = styled("nav")`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: ${({ theme }) => theme.spacing(1)};
`;

export const Item = styled(Link)`
  color: inherit;
  white-space: nowrap;
`;
