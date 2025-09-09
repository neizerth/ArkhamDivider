import { createHashRouter } from "react-router";
import { HomePage } from "@/pages/home/ui";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
])