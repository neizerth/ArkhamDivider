import BaseButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Branding from "./images/branding.svg?react";

export const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled(BaseButton)`
  display: flex;
  flex: 1;
  color: black;
  font-size: 1.1rem;
  min-width: auto;
`;

export const BrandingIcon = styled(Branding)`
  width: 26px;
`;
