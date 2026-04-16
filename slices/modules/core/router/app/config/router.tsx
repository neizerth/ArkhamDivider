import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { Root } from "../ui/Root";

const HomePage = lazy(() =>
	import("@/pages/home/ui").then((m) => ({ default: m.HomePage })),
);
const AboutPage = lazy(() =>
	import("@/pages/about/ui").then((m) => ({ default: m.AboutPage })),
);
const HowToPrintPage = lazy(() =>
	import("@/pages/how-to-print/ui").then((m) => ({
		default: m.HowToPrintPage,
	})),
);
const LayoutPage = lazy(() =>
	import("@/pages/layout/ui").then((m) => ({ default: m.LayoutPage })),
);

type HmrData = {
	router?: ReturnType<typeof createBrowserRouter>;
};

const hot = import.meta.hot;
const hmrData = hot?.data as HmrData | undefined;

export const router =
	hmrData?.router ??
	createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
				{
					path: "about",
					element: <AboutPage />,
				},
				{
					path: "how-to-print",
					element: <HowToPrintPage />,
				},
				{
					path: ":language",
					children: [
						{
							index: true,
							element: <HomePage />,
						},
						{
							path: "about",
							element: <AboutPage />,
						},
						{
							path: "how-to-print",
							element: <HowToPrintPage />,
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
									path: ":dividerType",
									children: [
										{
											path: ":storyCode",
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
