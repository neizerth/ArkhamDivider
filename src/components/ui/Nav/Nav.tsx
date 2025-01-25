import classNames from "classnames";
import S from "./Nav.module.scss";
import { useState } from "react";

export type NavProps<T> = {
	items: NavItem<T>[];
	onChange?: (value: T) => void;
	defaultValue: T;
};

export type NavItem<T> = {
	name: string;
	value: T;
};

export function Nav<T>({
	items,
	defaultValue,
	onChange = (f) => f,
}: NavProps<T>) {
	const [value, setValue] = useState(defaultValue);

	const select = (value: T) => {
		onChange(value);
		setValue(value);
	};
	return (
		<div className={S.container}>
			{items.map((item) => (
				<div
					className={classNames(
						S.item,
						item.value === value && S.selected,
						S.enabled,
					)}
					onClick={() => select(item.value)}
				>
					{item.name}
				</div>
			))}
		</div>
	);
}
