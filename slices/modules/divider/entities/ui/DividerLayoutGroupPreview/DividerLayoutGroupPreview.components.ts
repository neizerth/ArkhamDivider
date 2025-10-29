import { styled } from "@mui/material/styles";
import { Link } from "@/modules/core/router/entities/ui";
import { Row } from "@/shared/ui";

export const Container = styled(Link)`
  text-decoration: none;
  color: inherit;
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

export const Icon = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;
