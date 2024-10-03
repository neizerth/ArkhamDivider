import { IDividersState } from "./dividers";

export const removeAllDividers = (state: IDividersState) => {
  state.list = [];
}