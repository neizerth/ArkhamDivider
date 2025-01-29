import { Container } from "@/components";
// import S from './WithLayoutSupport.module.scss';
import { useLayoutSupport } from "@/shared/lib/hooks/stories/useLayoutSupport";
import type { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

export type WithLayoutSupportProps = PropsWithChildren & {
	fallback?: boolean;
};

export const WithLayoutSupport = ({
	children,
	fallback,
}: WithLayoutSupportProps) => {
	const { t } = useTranslation();
	const supported = useLayoutSupport();
	return (
		<>
			{supported && children}
			{!supported && fallback && (
				<Container>{t("Campaign is not supported")}</Container>
			)}
		</>
	);
};
