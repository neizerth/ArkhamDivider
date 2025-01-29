import classNames from "classnames";
import type { ComponentProps } from "react";
import useFitText, { type TOptions } from "use-fit-text";
import S from "./TextFit.module.scss";

export type TextFitProps = ComponentProps<"div"> &
	TOptions & {
		text: string;
		stroke?: boolean;
		strokeClassName?: string;
	};

export const TextFit = ({
	text,
	stroke,
	strokeClassName,
	className,
	...props
}: TextFitProps) => {
	const { fontSize, ref } = useFitText(props);
	const styles = {
		fontSize,
	};
	return (
		<div
			className={classNames(S.container, className)}
			style={styles}
			ref={ref}
		>
			<span className={S.text}>{text}</span>
			{stroke && (
				<div className={classNames(S.stroke, strokeClassName)} style={styles}>
					{text}
				</div>
			)}
		</div>
	);
};
