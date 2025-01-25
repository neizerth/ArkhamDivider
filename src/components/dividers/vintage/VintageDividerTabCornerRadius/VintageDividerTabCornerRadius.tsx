import styled from "styled-components";
import { DividerCornerRadius } from "../../common/DividerCornerRadius/DividerCornerRadius";

export const VintageDividerTabCornerRadius = styled(DividerCornerRadius)`
  border-radius: 4mm 4mm 0 0;
  bottom: 0;
  z-index: 2;
  clip-path: inset(0 0 2px 0);
  border-color: rgba(255, 255, 255, 0.5);
`;
