import type { PropsWithChildren } from "react";
import * as C from "./Flag.components";

type FlagProps = PropsWithChildren;

export function Flag({ children }: FlagProps) {
	return (
		<C.Container>
			{children}
			<h1>Flag.tsx</h1>
		</C.Container>
	);
}
