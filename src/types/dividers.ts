import { CardType, ICost } from "./game"

export type IDivider = {
    id: string
    type: string
    name?: string
    icon?: string
    cardType?: CardType,
    previewIcon?: string
    campaignIcon?: string
    isUpgrading?: boolean
    cost?: ICost,
    size?: number
}

export type IDividerList = IDivider[];
