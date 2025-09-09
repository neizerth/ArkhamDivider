import { RouterProvider as Provider } from "react-router";
import { router } from "../../config";

export function RouterProvider() {
  return (
    <Provider router={router}/>
  );
}