import { IArkhamData } from 'arkham-divider-data';

export type IIcon = IArkhamData.Core['icons'][number];

export type IIconSet = {
  icons: IIcon[]
}