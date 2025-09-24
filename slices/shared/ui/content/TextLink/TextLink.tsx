import Link, { type LinkProps } from "@mui/material/Link";
import { styled } from "@mui/material/styles";

export type TextLinkProps = LinkProps;
export const TextLink = styled(Link)`

  &:not(:hover) {
    color: inherit;
  }
  &:hover {
    color: ${({ theme }) => theme.palette.primary.dark};
  }
`;
