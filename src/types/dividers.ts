import { IStory } from "./api"

export type IDivider = {
    id: string
    type: string
    name?: string
    icon?: string
}

export type IDividerList = IDivider[];

export enum DividerType {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
};