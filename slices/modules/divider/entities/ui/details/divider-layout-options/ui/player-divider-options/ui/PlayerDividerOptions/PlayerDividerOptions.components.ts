import { styled } from "@mui/material/styles";
import { Row as BaseRow } from "@/shared/ui";

export const Row = styled(BaseRow)`
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
`;
