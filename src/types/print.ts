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

export type GuideCornerType = 'tl' | 'tr' | 'bl' | 'br';

export type GuideInsetTypes = PrefixedUnion<'inset-corner-', GuideCornerType>;
export type GuideOutsetTypes = PrefixedUnion<'outset-corner-', GuideCornerType>;

export type GuideType = 'cross' | 'corner' | GuideInsetTypes | GuideOutsetTypes;