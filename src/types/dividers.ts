export type IDivider = {
    id: string
    type: string
    name?: string
    icon?: string
    campaignIcon?: string
    isUpgrading?: boolean
    cost?: {
      value?: number
      text: string
      fixed: boolean
    },
    size?: number
}

export type IDividerList = IDivider[];
