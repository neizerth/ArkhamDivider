import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const SkillBackground = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 0.85em;
`;

export const AssetEventBackground = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 0.85em;
`;

export const SkillLevel = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0.025em;
  width: 100%;
  font-size: 0.85em;
`;

export const AssetEventLevel = styled(SkillLevel)`
  position: absolute;
  bottom: -0.02em;
  left: 0;
  width: 100%;
  font-size: 0.85em;
`;
