import { metadata } from '@/app/layout';
import { 
  IReactIcoMoonExtendedIconSet, 
  IIcoMoonProject, 
  IIcoMoonIconSet,
  IIcoMoonIconSetItem,
  IReactIcoMoonExtendedIcon
} from '@/types/icomoon'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const transformProjectToIconSet = ({ iconSets }: IIcoMoonProject): IReactIcoMoonExtendedIconSet => ({
  icons: iconSets
    .map(mapIconSet)
    .flat()
})

const addIconName = ({ selection, metadata }: IIcoMoonIconSet) => {
  const encounterSet = metadata.name;
  const iconMap = new Map<number, string>();
  selection.forEach((item) => iconMap.set(item.id, item.name));

  return (icon: IIcoMoonIconSetItem): IReactIcoMoonExtendedIcon => {
    return {
      properties: {
        encounterSet,
        name: iconMap.get(icon.id) || '',
      },
      icon
    }
  }
}

const mapIconSet = (iconSet: IIcoMoonIconSet) => iconSet.icons.map(addIconName(iconSet));
