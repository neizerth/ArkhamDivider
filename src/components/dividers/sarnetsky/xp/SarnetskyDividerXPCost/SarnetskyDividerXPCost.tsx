import { MAX_XP } from "@/shared/config/xp";
import type { IXPCost } from "@/shared/model/types/game";
import classNames from "classnames";
import { range } from "ramda";
import S from "./SarnetskyDividerXPCost.module.scss";
import Dot from "./images/dot.svg?react";

export type SarnetskyDividerXPCostProps = {
	xpCost: IXPCost;
};

export const SarnetskyDividerXPCost = ({
	xpCost,
}: SarnetskyDividerXPCostProps) => {
	const { level, max = level } = xpCost;

	return (
		<div className={S.container}>
			{level >= 0 &&
				range(1, MAX_XP + 1).map((l) => (
					<Dot
						key={l}
						className={classNames(
							S.level,
							l <= level && S.current,
							l > level && l <= max && S.max,
							l > max && S.inactive,
						)}
					/>
				))}
		</div>
	);
};
