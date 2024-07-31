import IcoMoon from 'react-icomoon';

export type IReactIcoMoonIconSet = React.ComponentProps<typeof IcoMoon>['iconSet'];
export type IReactIcoMoonIcon = IReactIcoMoonIconSet['icons'][number];

export type IReactIcoMoonExtendedIcon = IReactIcoMoonIcon & {
  properties: {
    encounterSet: string
  }
};

export type IReactIcoMoonExtendedIconSet = {
  icons: IReactIcoMoonExtendedIcon[]
}

export type IIcoMoonIconSetItem = {
  id: number;
  paths: string[];
  attrs?: Object[];
  width?: number;
  grid: number;
  tags: string[];
};

export type IIcoMoonSelectionItem = {
  order: 0;
  id: number;
  name: string;
  prevSize: number;
  code: number;
  tempChar: string;
};

export type IIcoMoonIconSet = {
  selection: IIcoMoonSelectionItem[];
  id: number;
  metadata: {
    name: string,
    importSize: {
      width: number,
      height: number
    }
  },
  height: number,
  prevSize: number,
  icons: IIcoMoonIconSetItem[]
}

export type IIcoMoonProject = {
  metadata: {
    name: string,
    lastOpened: number,
    c: number,
  },
  iconSets: IIcoMoonIconSet[]
}