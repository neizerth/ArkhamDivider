export type IDivider = {
    id: string
    type: string
    name?: string
    icon?: string
    campaignIcon?: string
    size?: number
}

export type IDividerList = IDivider[];

export enum LayoutType {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
};