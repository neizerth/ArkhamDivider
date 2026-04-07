import type { JSX } from "react";
import * as C from "./Flag.components";
import { flagAssetUrlByIso } from "./flagAssetUrls";

type FlagProps = JSX.IntrinsicElements["div"] & {
	code: string;
	round?: boolean;
};

const flagMapping: Record<string, string> = {
	en: "us",
	ko: "kr",
	zh: "cn",
	vi: "vn",
	zh_cn: "cn",
};

export function Flag({ code, ...props }: FlagProps) {
	const iso = flagMapping[code] || code;
	const src = flagAssetUrlByIso[iso] ?? flagAssetUrlByIso.us;

	return (
		<C.Container {...props}>
			<C.FlagImg src={src} alt="" loading="lazy" decoding="async" />
		</C.Container>
	);
}
