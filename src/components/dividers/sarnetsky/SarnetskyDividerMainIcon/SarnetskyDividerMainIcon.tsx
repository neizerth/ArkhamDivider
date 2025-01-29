import { PropsWithClassName } from "@/shared/model/types/util";
import S from "./SarnetskyDividerMainIcon.module.scss";
import { Icon } from "@/components/ui/icons/Icon/Icon";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useIconSelect } from "@/shared/lib/hooks/useIconSelect";

export type SarnetskyDividerMainIconProps = PropsWithClassName & {
	icon: string;
	dynamicHeight?: boolean;
};

export const SarnetskyDividerMainIcon = ({
	className,
	dynamicHeight,
	...props
}: SarnetskyDividerMainIconProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [fontSize, setFontSize] = useState<string>();

	useEffect(() => {
		if (!ref.current) {
			return;
		}
		if (!dynamicHeight) {
			return;
		}

		const rect = ref.current.getBoundingClientRect();
		const fontSize = `${rect.height * 0.8}px`;
		setFontSize(fontSize);
	}, [ref, dynamicHeight]);

	const style = { fontSize };

	const [icon, selectIcon] = useIconSelect({
		defaultIcon: props.icon,
	});

	return (
		<div
			className={classNames(S.container, className)}
			ref={ref}
			style={style}
			onClick={selectIcon}
		>
			<div className={classNames(S.icon)}>{icon && <Icon icon={icon} />}</div>
		</div>
	);
};
