import { createHashRouter } from "react-router";
import { dividerTypes } from "@/modules/divider/shared/config";
import { HomePage } from "@/pages/home/ui";
import { LayoutPage } from "@/pages/layout/ui";
import { Root } from "../ui/Root";

const _dividerTypePaths = dividerTypes.map(
	(path) =>
		({
			path,
			element: <LayoutPage />,
		}) as const,
);

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
						children: [
							{
								path: ":dividerType",
								element: <LayoutPage />,
							},
							{
								path: ":storyCode",
								children: [
									{
										path: ":dividerType",
										element: <LayoutPage />,
									},
								],
							},
						],
					},
				],
			},
		],
	},
]);

export type AppRouter = typeof router;
