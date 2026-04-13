import type { VercelRequest, VercelResponse } from "@vercel/node";

type PageviewBody = {
	pageUrl?: unknown;
};

const getCounterId = () =>
	process.env.APP_METRIKA_ID ||
	process.env.VITE_METRIKA_ID ||
	process.env.METRIKA_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method === "OPTIONS") {
		res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		return res.status(204).end();
	}

	if (req.method !== "POST") {
		return res.status(405).end();
	}

	const counterId = getCounterId();
	if (!counterId) {
		return res.status(204).end();
	}

	const body = (req.body ?? {}) as PageviewBody;
	if (typeof body.pageUrl !== "string") {
		return res.status(400).end("pageUrl required");
	}

	let pageUrl: URL;
	try {
		pageUrl = new URL(body.pageUrl);
	} catch {
		return res.status(400).end("invalid pageUrl");
	}

	const hostHeader = req.headers.host;
	if (!hostHeader || pageUrl.host !== hostHeader) {
		return res.status(403).end("host mismatch");
	}

	const mcUrl = new URL(`https://mc.yandex.ru/watch/${counterId}`);
	mcUrl.searchParams.set("page-url", body.pageUrl);
	mcUrl.searchParams.set("charset", "utf-8");

	const ua =
		(typeof req.headers["user-agent"] === "string" &&
			req.headers["user-agent"]) ||
		"ArkhamDivider";

	try {
		await fetch(mcUrl, {
			headers: {
				"User-Agent": ua,
				Referer: body.pageUrl,
			},
			redirect: "follow",
		});
	} catch {
		return res.status(502).end("metrika upstream failed");
	}

	return res.status(204).end();
}
