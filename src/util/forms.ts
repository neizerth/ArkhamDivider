import { ReactEventHandler } from "react";

// const createChangeHanlder = <T, State>(onChange: (element: T) => void) => 
//   (obj: State) => 
//     <K extends keyof State>(prop: K): ReactEventHandler<T> => 
//       e => {
//         const newState = onChange(e.target as T);
//       }

export const createToggleHanlder = <K extends PropertyKey>(state: Record<K, boolean>, onChange: (data: Record<K, boolean>) => void) =>
  (prop: K): ReactEventHandler => 
    e => {
      const target = e.target as HTMLInputElement;
      onChange({
        ...state,
        [prop]: target.checked
      })
    }