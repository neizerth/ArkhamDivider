import { IStory } from "@/shared/types/api";
import { prop, uniq } from "ramda";

export const getCampaignDividersCount = ({ name, campaigns = [] }: IStory) =>
	uniq([name, ...campaigns.map(prop("name"))]).length;
