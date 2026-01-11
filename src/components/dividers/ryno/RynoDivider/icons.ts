import { DividerType } from '@/shared/types/dividers';
import { DividerProps } from '../../common/Divider/Divider';

export const getDefaultLargeIcon = (props: DividerProps) => {
  if (props.campaignIcon) {
    return props.campaignIcon;
  }
  if (props.type === DividerType.INVESTIGATOR) {
    return 'investigator';
  }
};
