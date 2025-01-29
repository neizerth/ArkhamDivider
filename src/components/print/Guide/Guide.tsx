import type { GuideType } from "@/shared/model/types/print";
import type { PropsWithClassName } from "@/shared/model/types/util";
import classNames from "classnames";
import S from "./Guide.module.scss";

export type GuideProps = PropsWithClassName & {
	type?: GuideType;
	inset?: boolean;
};

export const Guide = ({ className, type = "cross" }: GuideProps) => {
	return (
		<div className={classNames(S.container, S[type], className)}>
			<div className={S.lines}>
				<div className={S.horizontal} />
				<div className={S.vertical} />
			</div>
		</div>
	);
};
