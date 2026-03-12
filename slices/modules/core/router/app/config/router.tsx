import { createHashRouter } from "react-router";
import { HomePage } from "@/pages/home/ui";
import { LayoutPage } from "@/pages/layout/ui";
import { Root } from "../ui/Root";

type HmrData = {
	router?: ReturnType<typeof createHashRouter>;
};

const hot = import.meta.hot;
const hmrData = hot?.data as HmrData | undefined;

export const router =
	hmrData?.router ??
	createHashRouter([
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

if (hot) {
	(hot.data as HmrData).router = router;
}

export type AppRouter = typeof router;
