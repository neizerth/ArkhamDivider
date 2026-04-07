import { styled } from "@mui/material";
import { Link as BaseLink } from "@/modules/core/router/entities/ui";
import { Row } from "@/shared/ui";

export const Link = styled(BaseLink)`
  color: inherit;
  text-decoration: none;

`;

export const Chip = styled(Row)`
  background-color: ${({ theme }) => theme.palette.grey[200]};
  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[300]};
  }
  padding: 0.5rem;
  border-radius: 1rem;
  align-items: center;
`;
