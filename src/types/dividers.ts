import { ICampaign, IEncounterSet, IScenario, IStory } from "./api"
import { CardType, IXPCost } from "./game"

export enum DividerType {
    PLAYER = 'player',
    SCENARIO = 'scenario',
    CAMPAIGN = 'campaign',
    INVESTIGATOR = 'investigator',
    ENCOUNTER = 'encounter'
}

export enum DividerSubtype {
    FACTION = 'faction',
    INVESTIGATORS = 'investigators',
    CARD = 'card',
    WEAKNESS = 'weakness',
    BASIC_WEAKNESS = 'basic_weakness',
    BONDED = 'bonded',
    CUSTOMIZATIONS = 'customizations',
    UPGRADE = 'upgrade',
    ALLY = 'ally',
}

export type IDivider = {
    id: string
    story?: IStory
    campaign?: ICampaign
    scenario?: IScenario
    encounterSet?: IEncounterSet
    type: DividerType
    subtype?: DividerSubtype
    name?: string
    icon?: string
    specialIcon?: string
    faction?: string
    cardType?: CardType
    background?: string
    previewIcon?: string
    campaignIcon?: string
    xpCost?: IXPCost,
    size?: number

    displaySideXP?: boolean
    displayNumericXP?: boolean
    displayCampaignIcon?: boolean

    tags?: string[]
}

export type IDividerList = IDivider[];
