
export type IFaction = {
  id: string
  icon: string
  name: string
}

export enum Cost {
  ZERO = '0',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5'
}

export enum CardType {
  SKILL = 'skill',
  ASSET = 'asset',
  EVENT = 'event'
}

export type ICost = {
  value: string
  level?: number
  is_fixed: boolean
}

export type ICardType = {
  id: string
  name: string
  type: CardType
  icon?: string
}