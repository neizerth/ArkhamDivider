import { Guides } from "@/components/print/Guides/Guides";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectLayout } from "@/shared/lib/store/features/layout/layout";
import { selectBleed } from "@/shared/lib/store/features/print/print";
import type { PropsWithClassName } from "@/shared/model/types/util";
import type { PropsWithChildren } from "react";
import S from "./DividerContent.module.scss";

import { NotExportable } from "@/components/ui/behavior/NotExportable/NotExportable";
import classNames from "classnames";
import { Content, GuidesContent, Wrapper } from "./components";

export type DividerContentProps = PropsWithClassName & PropsWithChildren & {};

export const DividerContent = ({
	children,
	className,
}: DividerContentProps) => {
	const layout = useAppSelector(selectLayout);
	const useBleed = useAppSelector(selectBleed);

	const styledProps = {
		$bleed: useBleed,
		$layout: layout,
	};

	return (
		<div className={classNames(S.container, useBleed && "divider", className)}>
			<NotExportable>
				<GuidesContent className={S.guides} {...styledProps}>
					<Guides className={S.guidesContent} guideClassName={S.guide} />
				</GuidesContent>
			</NotExportable>
			<Wrapper
				className={classNames(S.wrapper, !useBleed && "divider")}
				{...styledProps}
			>
				<Content className={S.divider} {...styledProps}>
					{children}
				</Content>
			</Wrapper>
		</div>
	);
};
