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