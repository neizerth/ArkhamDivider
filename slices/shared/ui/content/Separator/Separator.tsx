import { styled } from "@mui/material/styles";

export const Separator = styled("div")`
	width: 1px;
	height: 1.5rem;
	background-color: ${({ theme }) => theme.palette.divider};
`;
