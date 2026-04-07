import BaseButton from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import { Icon as BaseIcon } from "@/modules/core/icon/shared/ui";

export const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled(BaseButton)`
  display: flex;
  flex: 1;
  font-size: 1.3rem;
  min-width: auto;
`;

export const Icon = styled(BaseIcon)`
  color: black;
`;

export const ContextMenu = styled(Popper)`
  z-index: 1;
`;
