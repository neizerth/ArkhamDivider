export type IDivider = {
    id: string
    layoutId?: string
    name?: string
    color?: boolean
    icon?: string
    language: string
    campaignIcon?: string
    scenarioIndex?: number
}

export type IDividerList = IDivider[];

export enum DividerType {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
};