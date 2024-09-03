import { 
  IReactIcoMoonExtendedIconSet, 
  IIcoMoonProject, 
  IIcoMoonIconSet,
  IIcoMoonIconSetItem,
  IReactIcoMoonExtendedIcon
} from '@/types/icomoon'


export const transformProjectToIconSet = ({ iconSets }: IIcoMoonProject): IReactIcoMoonExtendedIconSet => ({
  icons: iconSets
    .map(mapIconSet)
    .flat()
})

const addIconName = ({ metadata, selection }: IIcoMoonIconSet) => {
  const encounterSet = metadata.name;

  const iconMap = new Map<number, string>();
  selection.forEach((item) => iconMap.set(item.id, item.name));

  return (icon: IIcoMoonIconSetItem): IReactIcoMoonExtendedIcon => {
    let [name] = icon.tags;
    const tags: string[] = [];
    const tagName = iconMap.get(icon.id);

    if (tagName && name !== tagName) {
      name = tagName;
    }
    
    return {
      properties: {
        encounterSet,
        name,
        tags
      },
      icon
    }
  }
}

const mapIconSet = (iconSet: IIcoMoonIconSet) => iconSet.icons.map(addIconName(iconSet));

// const mapIconSet = (iconSet: IIcoMoonIconSet) => iconSet.icons.map(addIconName);