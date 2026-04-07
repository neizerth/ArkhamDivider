import { css } from "@emotion/css";
import { styled } from "@mui/material/styles";

export const Container = styled("div")<{ round?: boolean }>`
  position: relative;
  border-radius: 50%;
  display: flex;
  ${({ round }) =>
		round &&
		css`
    border-radius: 50%;
    overflow: hidden;
  `}
`;

export const FlagImg = styled("img")`
	display: block;
	width: 24px;
  aspect-ratio: 1;
	object-fit: contain;
`;
