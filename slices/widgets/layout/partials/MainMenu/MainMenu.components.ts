import { styled } from "@mui/material/styles";
import { Link } from "react-router";

export const Container = styled("div")`
`;

export const List = styled("nav")`
	display: flex;
	gap: ${({ theme }) => theme.spacing(1)};
`;

export const Item = styled(Link)`
  color: inherit;
`;
