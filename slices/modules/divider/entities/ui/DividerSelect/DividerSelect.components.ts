import ContrastIcon from "@mui/icons-material/Contrast";
import TabIcon from "@mui/icons-material/Tab";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import HorizontalIcon from "./images/horizontal.svg?react";
import VerticalIcon from "./images/vertical.svg?react";

export const Container = styled("div")`

`;

export const Item = styled(MenuItem)`
  vertical-align: middle;
`;

const iconStyles = {
	fontSize: "1em",
	height: "1em",
};

export const DividerIcon = styled(WebAssetIcon)(() => ({
	...iconStyles,
}));

export const Tab = styled(TabIcon)(() => ({
	...iconStyles,
}));

export const Vertical = styled(VerticalIcon)(() => ({
	...iconStyles,
}));

export const Horizontal = styled(HorizontalIcon)(() => ({
	...iconStyles,
}));

export const Contrast = styled(ContrastIcon)(() => ({
	...iconStyles,
}));
