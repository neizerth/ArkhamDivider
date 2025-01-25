import { PropsWithClassName } from "@/shared/types/util";
import S from "./Popup.module.scss";
import classNames from "classnames";
import { PropsWithChildren, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { clearActivePopupId } from "@/app/store/features/app/app";

export type PopupProps = PropsWithClassName &
	PropsWithChildren & {
		show?: boolean;
		contentClassName?: string;
		scrollable?: boolean;
	};

export const Popup = ({
	children,
	show = false,
	scrollable = true,
	className,
	contentClassName,
}: PopupProps) => {
	const dispatch = useAppDispatch();
	const ref = useRef(null);

	const close = () => dispatch(clearActivePopupId());

	useOnClickOutside(ref, close);

	return (
		<>
			{show && (
				<div className={classNames(S.container, className)}>
					<div className={classNames(S.content, contentClassName)} ref={ref}>
						<div className={S.close} onClick={close}>
							&times;
						</div>
						<div className={classNames(S.wrapper, scrollable && S.scrollable)}>
							{children}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
