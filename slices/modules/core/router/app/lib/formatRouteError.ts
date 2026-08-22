import { isRouteErrorResponse } from "react-router";
import { prepareString, serialize } from "@/shared/util/string";

const formatThrown = (error: unknown): string => {
	if (isRouteErrorResponse(error)) {
		const lines = [`HTTP ${error.status} ${error.statusText}`.trim()];
		if (error.data != null) {
			lines.push(serialize(error.data));
		}
		return lines.join("\n");
	}

	if (error instanceof Error) {
		const lines = [`${error.name}: ${error.message}`];
		if (error.stack) {
			lines.push(error.stack);
		}
		if (error.cause != null) {
			lines.push("Cause:", formatThrown(error.cause));
		}
		return lines.join("\n");
	}

	if (error && typeof error === "object") {
		const record = error as Record<string, unknown>;
		const name = prepareString(record.name);
		const message = prepareString(record.message);
		const stack = prepareString(record.stack);
		if (name || message || stack) {
			const lines = [[name, message].filter(Boolean).join(": ")].filter(
				Boolean,
			);
			if (stack) {
				lines.push(stack);
			}
			return lines.join("\n");
		}
		return serialize(error);
	}

	return serialize(error);
};

/** Best-effort dump of whatever React Router put in `useRouteError`. */
export const formatRouteError = (error: unknown): string => {
	const header = [
		typeof window !== "undefined" ? `URL: ${window.location.href}` : null,
		typeof navigator !== "undefined"
			? `User-Agent: ${navigator.userAgent}`
			: null,
	].filter((line): line is string => Boolean(line));

	return [...header, "", formatThrown(error)].join("\n");
};
