import { prop, uniq } from 'ramda';
import { IStory } from '@/shared/types/api';

export const getCampaignDividersCount = ({ name, campaigns = [] }: IStory) =>
  uniq([name, ...campaigns.map(prop('name'))]).length;
