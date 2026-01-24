import { styled } from "@mui/material/styles";

export const Container = styled("div")`

`;

export const Icon = styled("span")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled("span")`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.up("sm")}) {
    display: block;
  }
`;
