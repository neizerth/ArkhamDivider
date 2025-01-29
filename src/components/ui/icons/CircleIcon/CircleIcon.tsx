import icons, { ICON_LAYOUT_HEIGHT } from "@/shared/data/icons";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectLayout } from "@/shared/lib/store/features/layout/layout";
import { selectBleed } from "@/shared/lib/store/features/print/print";
import classNames from "classnames";
import { propEq } from "ramda";
import { Icon, type IconProps } from "../Icon/Icon";
import S from "./CircleIcon.module.scss";
import { Container } from "./components";

export type CircleIconProps = Omit<IconProps, "scaleType"> & {
	type?: string;
	containerClassName?: string;
};

export const CircleIcon = ({
	containerClassName,
	type,
	...props
}: CircleIconProps) => {
	const bleed = useAppSelector(selectBleed);
	const layout = useAppSelector(selectLayout);
	const { height } = bleed ? layout.bleed : layout;

	const iconDataList = icons.filter(propEq(props.icon, "icon"));
	const iconTransform =
		iconDataList.find((icon) => icon.type === type) || iconDataList[0] || {};
	const layoutScale = height / ICON_LAYOUT_HEIGHT;

	return (
		<Container
			$transform={iconTransform}
			$layoutScale={layoutScale}
			className={classNames(S.container, containerClassName)}
		>
			<Icon {...props} scaleType="circle" />
		</Container>
	);
};
