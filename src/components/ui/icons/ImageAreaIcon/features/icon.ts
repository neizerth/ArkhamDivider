import { IIcon } from "@/types/api"
import { ImageAreaContainer } from "../ImageAreaIcon"
import { API_URL } from "@/constants/app"
const iconURL = API_URL + '/fonts/icons'

export const getIconPosition = ({
  container,
  icon,
  scale,
  ...options
}: {
  container?: ImageAreaContainer
  icon: IIcon
  scale: number
  top: number
  left: number
}) => {
  let left = options.left * scale;
  let top = options.top * scale;

  if (container) {
    const position = alignContainerIcon({
      container,
      scale,
      icon
    });

    left += position.left;
    top += position.top;
  }

  return {
    left,
    top
  }
}

export const alignContainerIcon = ({
  container,
  scale,
  icon
}: {
  container: ImageAreaContainer
  scale: number
  icon: IIcon
}) => {
  const { 
    alignX = 'center', 
    alignY = 'center'
  } = container;

  let left = container.x * scale;
  let top = container.y * scale;

  switch (alignX) {
    case 'right':
      left += container.width - icon.width;
      break;
    case 'center':
      left += Math.round((container.width * scale - icon.width) / 2);
  }

  switch (alignY) {
    case 'bottom':
      top += container.height - icon.height;
      break;
    case 'center':
      top += Math.round((container.height * scale - icon.height) / 2);
  }

  return {
    left,
    top
  }
}

export const getIconContents = async (icon: string) => {
  const url = `${iconURL}/${icon}.svg`;
  const response = await fetch(url);
  return await response.text();
}