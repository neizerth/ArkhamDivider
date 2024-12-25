import { Style } from "../types";

export const mergeStyles = (customStyles: Style, defaultStyles?: Style | Style[]) {
  if (!defaultStyles) {
    return customStyles
  }
  if (defaultStyles instanceof Array) {
    return [...defaultStyles, customStyles];
  }
  return [defaultStyles, customStyles];
}