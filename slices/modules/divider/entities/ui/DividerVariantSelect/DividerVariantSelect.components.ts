import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import BaseButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";

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

export const BrandingIcon = styled(FilterAltOutlinedIcon)`
  font-size: 26px;
`;
