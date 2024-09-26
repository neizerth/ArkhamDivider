import { IStory } from "./api"
import { CardType, IXPCost } from "./game"

export enum DividerType {
    PLAYER = 'player',
    SCENARIO = 'scenario',
    CAMPAIGN = 'campaign',
    INVESTIGATOR = 'investigator',
    ENCOUNTER = 'encounter'
}

export type IDivider = {
    id: string
    story?: IStory
    type: DividerType
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
