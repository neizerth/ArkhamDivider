import { Icon } from "@/components";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// import { removeDivider } from '@/store/features/dividers/dividers';
import {
	copyDivider,
	removeDivider,
} from "@/shared/lib/store/features/dividers/dividers";
import type { PropsWithClassName } from "@/shared/model/types/util";
import classNames from "classnames";
import S from "./DividerMenu.module.scss";

export type DividerMenuProps = PropsWithClassName & {
	id: string;
};

export const DividerMenu = ({ id, className }: DividerMenuProps) => {
	const dispatch = useAppDispatch();
	const onRemove = () => dispatch(removeDivider(id));
	const onCopy = () => dispatch(copyDivider(id));

	return (
		<div className={classNames(S.container, className)}>
			<div onClick={onCopy} className={S.item}>
				<Icon icon="icomoonfree-copy" className={classNames(S.icon, S.copy)} />
			</div>
			<div onClick={onRemove} className={S.item}>
				<Icon icon="trash" className={classNames(S.icon, S.remove)} />
			</div>
		</div>
	);
};
