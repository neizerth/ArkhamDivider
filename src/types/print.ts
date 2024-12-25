import { IBox } from "./units";
import { PrefixedUnion } from "./util";

export enum PageSide {
  FRONT = 'front',
  BACK = 'back'
} 

export type IPage<T> = {
  pageNumber: number;
  side: PageSide;
  merged?: boolean;
  rows: T[][]
  size: number;
}

export enum PageOrientation {
  LANDSCAPE = 'landscape',
  PORTRAIT = 'portrait'
}

export enum PageSizeType {
  A4 = 'A4',
  A3 = 'A3',
  B4 = 'B4',
  B3 = 'B3',
  SRA4 = 'SRA4',
  SRA3 = 'SRA3'
}

export const PageSize: Record<PageSizeType, IBox> = {
  A4: { width: 210, height: 297 },
  A3: { width: 297, height: 420 },
  B4: { width: 250, height: 353 },
  B3: { width: 353, height: 500 },
  SRA4: { width: 225, height: 320 },
  SRA3: { width: 320, height: 450 },
}

export const PrintPageSize: Record<PageSizeType, IBox> = {
  A4: { width: 2480, height: 3508 },
  A3: { width: 3508, height: 4961 },
  B4: { width: 2953, height: 4169 },
  B3: { width: 4169, height: 5906 },
  SRA4: { width: 2657, height: 3780 },
  SRA3: { width: 3780, height: 5315 },
}

export type GuideCornerType = 'tl' | 'tr' | 'bl' | 'br';

export type GuideInsetTypes = PrefixedUnion<'inset-corner-', GuideCornerType>;
export type GuideOutsetTypes = PrefixedUnion<'outset-corner-', GuideCornerType>;

export type GuideType = 'cross' | 'corner' | GuideInsetTypes | GuideOutsetTypes;