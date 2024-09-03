export enum PageSide {
  FRONT = 'front',
  BACK = 'back'
} 

export type IPage<T> = {
  pageNumber: number;
  side: PageSide;
  split?: boolean;
  rows: T[][]
}