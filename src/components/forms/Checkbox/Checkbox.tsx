import classNames from "classnames";
import type { ComponentProps } from "react";
import S from "./Checkbox.module.scss";

export type CheckboxProps = ComponentProps<"input"> & {
	labelClassName?: string;
	containerProps?: ComponentProps<"label">;
};

export const Checkbox = ({
	containerProps,
	labelClassName,
	children,
	...props
}: CheckboxProps) => {
	return (
		<label
			{...containerProps}
			className={classNames(S.container, containerProps?.className)}
		>
			<input type="checkbox" {...props} className={S.input} />
			<span className={classNames(S.label, labelClassName)}>{children}</span>
		</label>
	);
};
