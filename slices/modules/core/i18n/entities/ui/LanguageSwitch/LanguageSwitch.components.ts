import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Flag as BaseFlag } from "@/shared/ui";

export const Container = styled(Autocomplete)`

`;

export const InputContainer = styled(Box)`
  position: relative;
  width: 100px;
`;

export const FlagContainer = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
 
`;

export const Flag = styled(BaseFlag)`
  font-size: 30px;
  line-height: 1;
  height: 1em;
`;

export const Input = styled(TextField)`
`;
