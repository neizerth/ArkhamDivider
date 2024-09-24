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
    xpCost?: IXPCost,
    size?: number

    displaySideXP?: boolean
    displayNumericXP?: boolean
}

export type IDividerList = IDivider[];
