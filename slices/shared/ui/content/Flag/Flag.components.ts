import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import "flag-icons/css/flag-icons.min.css";

export const Container = styled("div")`
  position: relative;
  border-radius: 50%;
`;

export const Item = styled("span")`
  display: inline-block;
  border-radius: 50%;
`;

export const Overlay = styled(Stack)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.5em;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  border-radius: 50%;
`;
