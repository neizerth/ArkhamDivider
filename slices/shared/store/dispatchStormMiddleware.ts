import type { Middleware } from "@reduxjs/toolkit";

/** Dispatches within one frame that still count as a legitimate burst. */
const FRAME_LIMIT = 80;
/** Frames in a row above this count as a sustained loop. */
const SUSTAINED_LIMIT = 30;
const SUSTAINED_FRAMES = 5;
/** Silence between reports, so one loop does not flood the console. */
const COOLDOWN_MS = 2000;

type Counts = Record<string, number>;

const top = (counts: Counts) =>
	Object.entries(counts)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5);

/**
 * Development-only tripwire for render/dispatch loops.
 *
 * React aborts with "Maximum update depth exceeded" (minified error #185) after
 * 50 nested updates, and the stack it prints is pure React and react-redux
 * internals — it never names the action or the component that kept the chain
 * alive. This counts dispatches per frame and, on a burst, prints the action
 * mix plus the stack of the dispatch that crossed the line, which does name it.
 *
 * Compiled out of production builds: the caller guards the registration with
 * `import.meta.env.DEV`.
 */
export const createDispatchStormMiddleware = (): Middleware => {
	let counts: Counts = {};
	let total = 0;
	let frameRequested = false;
	let sustainedFrames = 0;
	let lastReportAt = 0;
	/**
	 * A sustained loop is only noticed at the end of a frame, where the stack is
	 * the animation-frame callback and says nothing. Once a frame runs hot, the
	 * next frame's first dispatch is sampled so the report has a real call site.
	 */
	let sampledCallSite: string | null = null;

	/** Redux/React plumbing sits between the dispatch and the code that caused it. */
	const isNoise = (line: string) =>
		/dispatchStormMiddleware|redux|react-dom|react_dom|scheduler|node_modules\/\.vite\/deps/.test(
			line,
		);

	const callSite = () => {
		const lines = (new Error().stack ?? "").split("\n").slice(1);
		const own = lines.filter((line) => !isNoise(line));
		return (own.length ? own : lines).slice(0, 8).join("\n");
	};

	const report = (reason: string, frameCounts: Counts, frameTotal: number) => {
		const now = Date.now();

		if (now - lastReportAt < COOLDOWN_MS) {
			return;
		}
		lastReportAt = now;

		console.warn(
			`[dispatch storm] ${reason}: ${frameTotal} dispatches\n` +
				top(frameCounts)
					.map(([type, count]) => `  ${count}x ${type}`)
					.join("\n") +
				"\nDispatched from:\n" +
				(sampledCallSite ?? callSite()),
		);
	};

	const endFrame = () => {
		frameRequested = false;

		if (total > SUSTAINED_LIMIT) {
			sustainedFrames += 1;
		} else {
			sustainedFrames = 0;
		}

		if (sustainedFrames >= SUSTAINED_FRAMES) {
			report(
				`${sustainedFrames} frames in a row above ${SUSTAINED_LIMIT}`,
				counts,
				total,
			);
			sustainedFrames = 0;
		}

		counts = {};
		total = 0;
		sampledCallSite = null;
	};

	return () => (next) => (action) => {
		const type =
			typeof action === "object" && action !== null && "type" in action
				? String((action as { type: unknown }).type)
				: "unknown";

		counts[type] = (counts[type] ?? 0) + 1;
		total += 1;

		if (sustainedFrames > 0 && total === 1) {
			sampledCallSite = callSite();
		}

		if (total === FRAME_LIMIT) {
			report(`${FRAME_LIMIT} dispatches in one frame`, counts, total);
		}

		if (!frameRequested && typeof requestAnimationFrame === "function") {
			frameRequested = true;
			requestAnimationFrame(endFrame);
		}

		return next(action);
	};
};
