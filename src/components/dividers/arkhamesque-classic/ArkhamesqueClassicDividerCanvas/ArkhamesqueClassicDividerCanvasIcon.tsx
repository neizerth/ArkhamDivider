import { Text } from "react-konva"
import { IIconContainer } from "./features/size"
import { getIconScale } from "@/components/ui/icons/FontIcon/getIconScale"
import icons from './icons';
import { propEq } from "ramda"
import { IconScaleFactor } from "@/types/icons";
import { IIcon } from "@/types/api";

export type IIconTransform = {
  icon: string
  left?: number
  top?: number
  scale?: number
  type?: string
}

export type ArkhamesqueClassicDividerCanvasIconProps = {
  icon: IIcon
  height: number
  top?: number
  left?: number
  container: IIconContainer
  type?: string
  scaleFactor?: IconScaleFactor
}

export const ArkhamesqueClassicDividerCanvasIcon = ({
  icon,
  top = 0,
  left = 0,
  container,
  scaleFactor,
  type,
 ...props
}: ArkhamesqueClassicDividerCanvasIconProps) => {
  const { ratio, circled } = icon;
  const scale = getIconScale({
		scaleType: 'circle',
    scaleFactor,
		ratio,
		circled,
	});

  const iconDataList = icons.filter(propEq(icon.icon, 'icon')) as IIconTransform[];

  const iconData = iconDataList.find(icon => icon.type === type) || iconDataList[0];
  const dX = iconData?.left || 0;
  const dY = iconData?.top || 0;
  // const dX = 0;
  // const dY = 0;

  const zoom = iconData?.scale || 1;

  const height = props.height * scale * zoom / 100;

  const width = icon.width * height / icon.height;

  const x = container.x + left + dX + (container.width - width) / 2;
  const y = container.y + top + + dY + (container.height - height) / 2;

  const text = String.fromCharCode(icon.code);

  return (
    <Text
      fontFamily="ArkhamIcons"
      fontSize={height}
      x={x}
      y={y}
      text={text}
    />
  )
}