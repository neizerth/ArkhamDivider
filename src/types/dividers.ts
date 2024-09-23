import { CardType, IXPCost } from "./game"

export type IDivider = {
    id: string
    type: string
    name?: string
    icon?: string
    faction?: string
    cardType?: CardType
    background?: string
    previewIcon?: string
    campaignIcon?: string
    isUpgrading?: boolean
    xpCost?: IXPCost,
    size?: number
}

export type IDividerList = IDivider[];
