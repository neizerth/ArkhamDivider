import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import S from "./LayoutOrientationToggle.module.scss";
import icon from "./images/change-orientation.svg";
import { selectLayout } from "@/app/store/features/layout/layout";
import { ILayout, LayoutOrientation } from "@/shared/types/layouts";
import { getLayouts } from "@/shared/lib/features/layouts/common";
import classNames from "classnames";
import { PropsWithClassName } from "@/shared/types/util";
import { useAppNavigate } from "@/shared/lib/hooks/useAppNavigate";

export type LayoutOrientationToggleProps = PropsWithClassName & {
	data: ILayout[];
};

export const LayoutOrientationToggle = ({
	className,
	data,
}: LayoutOrientationToggleProps) => {
	const navigate = useAppNavigate();
	const { orientation } = useAppSelector(selectLayout);

	const isVertical = orientation === LayoutOrientation.VERTICAL;

	const containerClassName = classNames(
		S.container,
		className,
		isVertical && S.vertical,
	);

	const toggleOrientation = () => {
		const nextOrientation =
			orientation === LayoutOrientation.HORIZONTAL
				? LayoutOrientation.VERTICAL
				: LayoutOrientation.HORIZONTAL;

		const criteria = {
			orientation: nextOrientation,
		};

		const [firstLayout] = getLayouts({
			criteria,
			source: data,
		});

		navigate({
			layout: firstLayout,
		});
	};

	return (
		<img
			className={containerClassName}
			src={icon}
			alt="Change Type"
			onClick={toggleOrientation}
		/>
	);
};
