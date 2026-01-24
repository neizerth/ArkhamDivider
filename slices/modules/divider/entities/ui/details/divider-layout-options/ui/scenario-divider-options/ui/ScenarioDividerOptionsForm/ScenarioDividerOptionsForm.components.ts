import { styled } from "@mui/material/styles";

export const Header = styled("h5")`
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  margin: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;
