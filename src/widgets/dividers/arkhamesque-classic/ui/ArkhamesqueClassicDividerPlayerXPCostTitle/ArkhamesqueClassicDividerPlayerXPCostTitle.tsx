import { MAX_XP } from "@/shared/config/xp";
import type { IXPCost } from "@/shared/model/types/game";
import classNames from "classnames";
import S from "./ArkhamesqueClassicDividerPlayerXPCostTitle.module.scss";

export type ArkhamesqueClassicDividerPlayerXPCostTitleProps = {
	xpCost: IXPCost;
};

const XPNumber = ({ value }: { value: number }) => {
	return (
		<span className={classNames(S.number, S[`number_${value}`])}>{value}</span>
	);
};

export const ArkhamesqueClassicDividerPlayerXPCostTitle = ({
	xpCost,
}: ArkhamesqueClassicDividerPlayerXPCostTitleProps) => {
	return (
		<span
			className={classNames(
				S.container,
				xpCost.max
					? [xpCost.max === MAX_XP ? S.withPlus : S.withRange]
					: S.single,
			)}
		>
			<XPNumber value={xpCost.level} />
			{xpCost.max && (
				<>
					{xpCost.max === MAX_XP && (
						<span className={classNames(S.plus, S[`plus_${xpCost.level}`])}>
							+
						</span>
					)}
					{xpCost.max < MAX_XP && (
						<>
							<span className={S.minus}>-</span>
							<XPNumber value={xpCost.max} />
						</>
					)}
				</>
			)}
		</span>
	);
};
