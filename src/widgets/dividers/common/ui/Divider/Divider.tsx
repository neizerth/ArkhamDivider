import { ArkhamDecoDivider } from "@/components/dividers/arkham-deco/ArkhamDecoDivider/ArkhamDecoDivider";
import { ClassicDivider } from "@/components/dividers/classic/ClassicDivider/ClassicDivider";
import { Invocation2018Divider } from "@/components/dividers/invocation2018/Invocation2018Divider/Invocation2018Divider";
import { SarnetskyDivider } from "@/components/dividers/sarnetsky/SarnetskyDivider/SarnetskyDivider";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectLayout } from "@/shared/lib/store/features/layout/layout";
// import S from './Divider.module.scss';
import type { IDivider } from "@/shared/model/types/dividers";
import type { PropsWithClassName } from "@/shared/model/types/util";
import { memo } from "react";
import { ArkhamStarter3mmDivider } from "../../arkham-starter-3mm/ArkhamStarter3mmDivider/ArkhamStarter3mmDivider";
import { ArkhamesqueClassicDivider } from "../../arkhamesque-classic/ArkhamesqueClassicDivider/ArkhamesqueClassicDivider";
import { VintageDivider } from "../../vintage/VintageDivider/VintageDivider";

export type DividerProps = PropsWithClassName &
	IDivider & {
		index: number;
		rowIndex: number;
	};

export const Divider = (props: DividerProps) => {
	const { categoryId } = useAppSelector(selectLayout);
	return (
		<>
			{categoryId === "classic" && <ClassicDivider {...props} />}
			{categoryId === "invocation2018" && <Invocation2018Divider {...props} />}
			{categoryId === "sarnetsky" && <SarnetskyDivider {...props} />}
			{categoryId === "arkham-deco" && <ArkhamDecoDivider {...props} />}
			{categoryId === "3mm" && <ArkhamStarter3mmDivider {...props} />}
			{categoryId === "arkhamesque-classic" && (
				<ArkhamesqueClassicDivider {...props} />
			)}
			{categoryId === "vintage" && <VintageDivider {...props} />}
		</>
	);
};

export const DividerMemo = memo(Divider);
