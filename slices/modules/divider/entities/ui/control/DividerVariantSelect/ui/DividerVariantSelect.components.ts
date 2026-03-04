import ConstructionIcon from "@mui/icons-material/Construction";
import BaseButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Icon } from "@/modules/core/icon/shared/ui";

export const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled(BaseButton)`
  display: flex;
  flex: 1;
  color: black;
  min-width: auto;
`;

export const BrandingIcon = styled(ConstructionIcon)`
  font-size: 26px;
`;

export const OrientationIcon = styled(Icon)`
  font-size: 26px;
`;
