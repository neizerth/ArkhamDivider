export type IIconMainGroup = {
  id: string;
  name: string;
  groups: IIconGroup[];
};

export type IIconGroup = {
  id: string;
  name?: string;
  icons: string[];
};

export type IconScaleType = 'circle' | 'square' | false;
export type IconScaleFactor = {
  all?: number;
  circled?: number;
  regular?: number;
};

export type IIconTransform = {
  icon: string;
  left?: number;
  top?: number;
  scale?: number;
  type?: string;
};
