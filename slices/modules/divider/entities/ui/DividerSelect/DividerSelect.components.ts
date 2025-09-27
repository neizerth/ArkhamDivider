import TabIcon from "@mui/icons-material/Tab";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
export const Container = styled("div")`

`;

export const Item = styled(MenuItem)`
  vertical-align: middle;
`;

export const DividerIcon = styled(WebAssetIcon)(({ theme }) => ({
	fontSize: "1em",
}));

export const Tab = styled(TabIcon)(({ theme }) => ({
	fontSize: "1em",
}));
