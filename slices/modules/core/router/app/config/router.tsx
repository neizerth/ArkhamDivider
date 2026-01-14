import { createHashRouter } from "react-router";
import { HomePage } from "@/pages/home/ui";
import { LayoutPage } from "@/pages/layout/ui";
import { Root } from "../ui/Root";

export const router = createHashRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: ":language",
				children: [
					{
						index: true,
						element: <HomePage />,
					},
					{
						path: "layout/:layoutId",
						element: <LayoutPage />,
					},
					{
						path: "layout/:layoutId/:dividerType(campaign|player|investigator)",
						element: <LayoutPage />,
					},
					{
						path: "layout/:layoutId/:dividerType(campaign|player|investigator)/:storyCode",
						element: <LayoutPage />,
					},
					{
						path: "layout/:layoutId/:storyCode",
						element: <LayoutPage />,
					},
				],
			},
		],
	},
]);

export type AppRouter = typeof router;
