import { propEq } from "ramda";
import { Icon, IconProps } from "../Icon/Icon";
import S from "./CircleIcon.module.scss";
import icons, { ICON_LAYOUT_HEIGHT } from "@/shared/data/icons";
import classNames from "classnames";
import { Container } from "./components";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectBleed } from "@/app/store/features/print/print";
import { selectLayout } from "@/app/store/features/layout/layout";

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
