import { cx } from "@emotion/css";
import type { JSX } from "react";
import * as C from "./Flag.components";

type FlagProps = JSX.IntrinsicElements["span"] & {
	code: string;
};

const flagMapping: Record<string, string> = {
	en: "us",
	ko: "kr",
	zh: "cn",
	"zh-cn": "cn",
};

export function Flag({ code, ...props }: FlagProps) {
	const flag = flagMapping[code] || code;
	const className = cx(props.className, "fi", "fis", `fi-${flag}`);

	return <C.Container {...props} className={className} />;
}
