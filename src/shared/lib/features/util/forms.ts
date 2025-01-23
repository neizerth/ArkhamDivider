import type { ReactEventHandler } from "react";

export const createToggleHanlder = <K extends PropertyKey>(
  state: Record<K, boolean>, 
  callback: (data: Record<K, boolean>
) => void) =>
  (prop: K) => {
    const onChange = onToggle(
      checked => callback({
        ...state,
        [prop]: checked
      })
    )

    return {
      onChange,
      checked: state[prop]
    }
  }

export const onToggle = (callback: (value: boolean) => void): ReactEventHandler => 
  e => {
    const target = e.target as HTMLInputElement;
    callback(target.checked);
  }