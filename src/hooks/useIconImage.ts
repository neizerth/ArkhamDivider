import { selectIcons } from "@/store/features/icons/icons"
import { useAppSelector } from "./useAppSelector"
import { propEq } from "ramda";
import { useEffect, useState } from "react";
import { getIconImage } from "@/features/icons/getIconImage";
import { IIcon } from "@/types/api";


export type UseIconImageData = {
  image: HTMLImageElement
  icon: IIcon
}

export type UseIconImageOptions = {
  icon?: string | false
}

export const useIconImage = ({
  icon,
}: UseIconImageOptions) => {
  const icons = useAppSelector(selectIcons);

  const entry = icon && icons.find(propEq(icon, 'icon'));
  const [data, setData] = useState<UseIconImageData>();

  useEffect(() => {
    if (!entry) {
      return;
    }

    getIconImage(entry.icon)
      .then(image => 
        setData({
          image,
          icon: entry,
        })
      );
    
  }, [entry]);

  return data;
}

