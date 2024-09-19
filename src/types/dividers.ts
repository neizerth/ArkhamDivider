import { IStory } from "./api"

export type IDivider = {
    id: string
    type: string
    name?: string
    icon?: string
    campaignIcon?: string
    size?: number
}

export type IDividerList = IDivider[];

export enum DividerType {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
};