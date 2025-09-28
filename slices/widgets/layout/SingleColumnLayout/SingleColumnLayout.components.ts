import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const Main = styled("main")`
  flex-grow: 1;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

export const Container = styled(Stack)`
  min-height: 100vh;
  height: 500px;
`;
