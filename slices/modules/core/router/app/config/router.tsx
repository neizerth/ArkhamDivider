import { createBrowserRouter } from "react-router";
import { lazyWithReload } from "@/shared/lib";
import { Root } from "../ui/Root";
import { RouteError } from "../ui/RouteError";

const HomePage = lazyWithReload(() =>
	import("@/pages/home/ui").then((m) => ({ default: m.HomePage })),
);
const AboutPage = lazyWithReload(() =>
	import("@/pages/about/ui").then((m) => ({ default: m.AboutPage })),
);
const HowToPrintPage = lazyWithReload(() =>
	import("@/pages/how-to-print/ui").then((m) => ({
		default: m.HowToPrintPage,
	})),
);
const LayoutPage = lazyWithReload(() =>
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
			// Catches lazy-route failures for the whole tree; without it React Router falls
			// back to its own developer error screen.
			errorElement: <RouteError />,
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
