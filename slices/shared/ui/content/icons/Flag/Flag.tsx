import { cx } from "@emotion/css";
import type { JSX } from "react";
import * as C from "./Flag.components";

type FlagProps = JSX.IntrinsicElements["div"] & {
	code: string;
	round?: boolean;
};

const flagMapping: Record<string, string> = {
	en: "us",
	ko: "kr",
	zh: "cn",
	vi: "vn",
	"zh-cn": "cn",
};

export function Flag({ code, ...props }: FlagProps) {
	const flag = flagMapping[code] || code;
	const className = cx(props.className, "fi", "fis", `fi-${flag}`);

	return (
		<C.Container {...props}>
			<C.Item className={className} />
		</C.Container>
	);
}
