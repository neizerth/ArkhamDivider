import { createHashRouter } from "react-router";
import { HomePage } from "@/pages/home/ui";
import { LayoutPage } from "@/pages/layout/ui";

export const router = createHashRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/:language",
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "layout/:layoutId",
				element: <LayoutPage />,
			},
		],
	},
]);
