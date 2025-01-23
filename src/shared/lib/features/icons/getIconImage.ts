import { getIconUrl } from "@/shared/api/arkhamDivider";

export const getIconImage = (icon: string) => {
  const url = getIconUrl(icon);
  const img = new Image;
  img.crossOrigin = 'anonymous';

  return new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;

    img.src = url;
  });
}