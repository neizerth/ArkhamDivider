export type IDivider = {
    id: string
    layoutId?: string
    name?: string
    icon?: string
    language: string
    campaignIcon?: string
    scenarioIndex?: number
}

export type IDividerList = IDivider[];

export enum IDividerType {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
};