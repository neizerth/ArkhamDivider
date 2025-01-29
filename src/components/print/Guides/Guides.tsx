import { Guide } from "@/components";
import type { GuideType } from "@/shared/model/types/print";
import type { PropsWithClassName } from "@/shared/model/types/util";
import classNames from "classnames";
import S from "./Guides.module.scss";

const DEFAULT_GUIDE_TYPE = "cross";

type GuideConfig = GuideType | false;

export type GuidesProps = PropsWithClassName & {
	topLeft?: GuideConfig;
	topRight?: GuideConfig;
	bottomLeft?: GuideConfig;
	bottomRight?: GuideConfig;
	contentClassName?: string;
	guideClassName?: string;
};

export const Guides = ({
	className,
	guideClassName,
	topLeft = DEFAULT_GUIDE_TYPE,
	topRight = DEFAULT_GUIDE_TYPE,
	bottomLeft = DEFAULT_GUIDE_TYPE,
	bottomRight = DEFAULT_GUIDE_TYPE,
}: GuidesProps) => {
	return (
		<div className={classNames(S.container, className)}>
			{topLeft && (
				<Guide
					className={classNames(guideClassName, S.guide, S.guide_topLeft)}
					type={topLeft}
				/>
			)}
			{topRight && (
				<Guide
					className={classNames(guideClassName, S.guide, S.guide_topRight)}
					type={topRight}
				/>
			)}
			{bottomLeft && (
				<Guide
					className={classNames(guideClassName, S.guide, S.guide_bottomLeft)}
					type={bottomLeft}
				/>
			)}
			{bottomRight && (
				<Guide
					className={classNames(guideClassName, S.guide, S.guide_bottomRight)}
					type={bottomRight}
				/>
			)}
		</div>
	);
};
