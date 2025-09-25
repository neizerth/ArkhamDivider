import { css } from "@emotion/css";
import { styled } from "@mui/material/styles";

import "flag-icons/css/flag-icons.min.css";

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

export const Item = styled("span")`
  display: inline-block;
`;
