import { UseIconImageData } from "@/hooks/useIconImage"
import { Image } from "react-konva"
import { IIconContainer } from "./features/size"
import { getIconScale } from "@/components/ui/icons/FontIcon/getIconScale"
import icons from './icons';
import { propEq } from "ramda"

export type IIconTransform = {
  icon: string
  left?: number
  top?: number
  scale?: number
  type?: string
}

export type ArkhamesqueClassicDividerCanvasIconProps = UseIconImageData & {
  height: number
  top?: number
  left?: number
  container: IIconContainer
  type?: string
}

export const ArkhamesqueClassicDividerCanvasIcon = ({
  icon,
  image,
  top = 0,
  left = 0,
  container,
  type,
 ...props
}: ArkhamesqueClassicDividerCanvasIconProps) => {
  const { ratio, circled } = icon;
  const scale = getIconScale({
		scale: 'circle', 
		ratio,
		circled,
	});

  const iconDataList = icons.filter(propEq(icon.icon, 'icon')) as IIconTransform[];

  const iconData = iconDataList.find(icon => icon.type === type) || iconDataList[0];
  const dX = iconData?.left || 0;
  const dY = iconData?.top || 0;
  const zoom = iconData?.scale || 1;

  const height = props.height * scale * zoom / 100;

  const width = icon.width * height / icon.height;

  const x = container.x + left + dX + (container.width - width) / 2;
  const y = container.y + top + + dY + (container.height - height) / 2;

  return (
    <Image
      image={image}
      height={height}
      width={width}
      x={x}
      y={y}
    />
  )
}