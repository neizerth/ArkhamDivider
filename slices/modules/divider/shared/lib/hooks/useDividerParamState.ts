import { useAppSelector } from "@/shared/lib";
import { selectDividerParam } from "../store";
import { useDividerParam } from "./useDividerParam";

type Options = {
	dividerId: string;
	key: string;
};

export const useDividerParamState = <T>({ dividerId, key }: Options) => {
	const value = useAppSelector(
		selectDividerParam<T | undefined>({
			id: dividerId,
			key,
		}),
	);

	const setValue = useDividerParam<T>({
		dividerId,
		key,
	});

	return [value, setValue] as const;
};
