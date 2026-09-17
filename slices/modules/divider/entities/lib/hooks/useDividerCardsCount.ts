import { isNumber, isValidNumber } from "ramda-adjunct";
import { type FocusEvent, useCallback } from "react";
import {
	selectDividerParam,
	selectShowCardsCount,
	setDividerParam,
} from "@/modules/divider/shared/lib";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { getDividerCardsCount } from "../logic/cards/getDividerCardsCount";

type Options<T = void> = {
	divider: DividerWithRelations<T>;
};

export const useDividerCardsCount = <T = void>({ divider }: Options<T>) => {
	const dispatch = useAppDispatch();

	const showCardsCount = useAppSelector((state) =>
		selectShowCardsCount(state, divider.id),
	);

	const defaultCardsCount = getDividerCardsCount(divider) ?? 0;
	const paramsCardsCount = useAppSelector(
		selectDividerParam<number>({ id: divider.id, key: "cardsCount" }),
	);

	const cardsCount: number = isValidNumber(paramsCardsCount)
		? Number(paramsCardsCount)
		: defaultCardsCount;

	const onValueChange = useCallback(
		(newValue: string) => {
			const number = Number(newValue);
			if (!isNumber(number)) {
				return;
			}

			dispatch(
				setDividerParam({
					id: divider.id,
					key: "cardsCount",
					value: number === defaultCardsCount ? null : number,
				}),
			);
		},
		[defaultCardsCount, dispatch, divider.id],
	);

	const onCommit = useCallback(
		(event: FocusEvent<HTMLDivElement>) => {
			onValueChange(event.currentTarget.textContent ?? "");
		},
		[onValueChange],
	);

	return {
		showCardsCount,
		cardsCount,
		defaultCardsCount,
		onValueChange,
		onCommit,
	};
};
