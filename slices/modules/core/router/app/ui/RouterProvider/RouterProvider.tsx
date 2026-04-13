import { useEffect } from "react";
import { RouterProvider as Provider } from "react-router";
import { BASE_PATH } from "@/shared/config/app";
import { router } from "../../config";

const metrikaPageviewPath = () => {
	const base = BASE_PATH.replace(/\/$/, "");
	const path =
		import.meta.env.VITE_METRIKA_PAGEVIEW_PATH ?? "/api/metrika/pageview";
	return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};

const sendMetrikaPageview = () => {
	if (!import.meta.env.PROD || !import.meta.env.VITE_METRIKA_ID) {
		return;
	}
	void fetch(metrikaPageviewPath(), {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ pageUrl: window.location.href }),
		keepalive: true,
	}).catch(() => {});
};

export function RouterProvider() {
	useEffect(() => {
		sendMetrikaPageview();
		window.addEventListener("hashchange", sendMetrikaPageview);
		return () => window.removeEventListener("hashchange", sendMetrikaPageview);
	}, []);

	return <Provider router={router} />;
}
