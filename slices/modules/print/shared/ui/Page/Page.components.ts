import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Page = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /**
   * Cropmarks sit outside the grid, so a tight layout can push them past the sheet edge.
   * Clipping them is the lesser evil: visible overflow paints them onto the neighbouring
   * sheet instead, which is what made page 2 look shifted.
   */
  overflow: hidden;
  margin: 0;

  @media print {
    /**
     * A page is sized to exactly the @page box, so sub-pixel rounding (Chrome on
     * Android applies its own page scale) is enough to make it not fit. Without
     * break-inside the browser splits the page instead of moving it whole, and the
     * top of the next sheet bleeds onto the bottom of the previous one.
     */
    break-inside: avoid;
    break-after: page;
    &:last-of-type {
      break-after: auto;
    }
    box-sizing: border-box;
  }
  @media screen {
    border-radius: 5px;
  }
`;

export const Counter = styled(Box)`
  position: absolute;
  text-align: right;
  z-index: 2;
  line-height: 1;
  @media print {
    font-size: 2.2mm;
    top: 1.5mm;
    right: 1.3mm;
  }
`;
