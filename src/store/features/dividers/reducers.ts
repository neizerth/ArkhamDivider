import { IDividersState } from "./dividers";

export const removeAllDividers = (state: IDividersState) => {
  state.loadIndex = 0;
  state.list = [];
}