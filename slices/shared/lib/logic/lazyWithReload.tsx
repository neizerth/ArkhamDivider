import { type ComponentType, lazy } from "react";

/**
 * A dynamic import can fail for a reason the user cannot act on:
 *
 * - production: the tab was opened before a deploy, and the hashed chunk it wants no longer
 *   exists on the server;
 * - development: HMR invalidated the module URL the router still holds.
 *
 * Both are fixed by loading the page again, which picks up a fresh `index.html` with the
 * current chunk names.
 */

const RELOAD_KEY = "app:chunk-reload-at";

/** Bounds reload loops: a permanently missing chunk reloads at most once per window. */
const RELOAD_WINDOW_MS = 10_000;

export function isChunkLoadError(error: unknown): boolean {
	// Not narrowed to `instanceof Error`: React Router hands `useRouteError` whatever was
	// thrown, and across realms or after wrapping that check fails on objects that still
	// carry the original message.
	const message =
		typeof error === "string"
			? error
			: typeof (error as { message?: unknown })?.message === "string"
				? (error as { message: string }).message
				: "";

	return /dynamically imported module|Importing a module script failed|error loading dynamically imported module|Failed to fetch/i.test(
		message,
	);
}

/**
 * Returns `true` when a reload was triggered, `false` when one already happened recently —
 * in which case the caller should surface the error instead of looping.
 */
export function reloadForStaleChunk(): boolean {
	if (typeof window === "undefined") {
		return false;
	}
	try {
		const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
		if (Date.now() - last < RELOAD_WINDOW_MS) {
			return false;
		}
		sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
	} catch {
		// private mode / storage disabled: reloading once is still better than a dead route
	}
	window.location.reload();
	return true;
}

type Loader<T> = () => Promise<{ default: T }>;

/**
 * `lazy`, but a stale-chunk failure reloads the page instead of rendering an error.
 *
 * While the reload is in flight the returned promise is left pending on purpose, so Suspense
 * keeps showing the fallback rather than flashing an error boundary for a page that is about
 * to disappear.
 */
// biome-ignore lint/suspicious/noExplicitAny: matches React's own `lazy` signature
export function lazyWithReload<T extends ComponentType<any>>(
	loader: Loader<T>,
) {
	return lazy(() =>
		loader().catch((error: unknown) => {
			if (isChunkLoadError(error) && reloadForStaleChunk()) {
				return new Promise<{ default: T }>(() => {});
			}
			throw error;
		}),
	);
}
