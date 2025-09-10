import Link, { type LinkProps } from "@mui/material/Link";
import { styled } from "@mui/material/styles";

export type TextLinkProps = LinkProps;

export const TextLink = styled(Link)`
  text-decoration: none;
  &:not(:hover) {
    color: inherit;
  }
`;
