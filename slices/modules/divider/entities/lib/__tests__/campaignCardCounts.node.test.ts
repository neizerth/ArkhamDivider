import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ArkhamDivider } from "arkham-divider-data";
import { describe, expect, it } from "vitest";
import {
	type ExpectedCampaign,
	generateCampaignDividers,
	matchExpectedDividers,
	OFFICIAL_CAMPAIGN_CODES,
	type Translation,
	translateDividerTitle,
} from "./campaignCardCounts.helpers";

const FIXTURE_PATH = resolve(
	import.meta.dirname,
	"../__fixtures__/officialCampaignCardCounts.json",
);
const CORE_URL = "https://neizerth.github.io/ArkhamDividerData/core.json";
const RU_URL = "https://neizerth.github.io/ArkhamDividerData/ru.json";

type Fixture = {
	campaigns: ExpectedCampaign[];
};

const loadRemote = async () => {
	const [core, ru] = await Promise.all([
		fetch(CORE_URL).then(
			(response) => response.json() as Promise<ArkhamDivider.Core>,
		),
		fetch(RU_URL).then((response) => response.json() as Promise<Translation>),
	]);
	return { core, ru };
};

describe("official campaign divider card counts", async () => {
	const fixture = JSON.parse(readFileSync(FIXTURE_PATH, "utf8")) as Fixture;
	const { core, ru } = await loadRemote();

	const campaigns = fixture.campaigns.filter((campaign) =>
		OFFICIAL_CAMPAIGN_CODES.includes(
			campaign.code as (typeof OFFICIAL_CAMPAIGN_CODES)[number],
		),
	);

	expect(campaigns.length).toBe(OFFICIAL_CAMPAIGN_CODES.length);

	for (const campaign of campaigns) {
		it(`${campaign.code}: ${campaign.name} — all expected dividers exist with matching totals`, () => {
			const dividers = generateCampaignDividers(campaign.code, core);
			const actual = dividers.map((divider) => ({
				divider,
				displayName: translateDividerTitle(divider, ru),
				cardsCount: divider.cardsCount ?? 0,
				used: false,
			}));

			const { missing, mismatches } = matchExpectedDividers(
				campaign.dividers,
				actual,
			);

			const problems = [
				...missing.map(
					(item) =>
						`missing ${item.section} "${item.name}" (expected ${item.total})`,
				),
				...mismatches.map(
					({ expected, actual: found }) =>
						`count mismatch ${expected.section} "${expected.name}": expected ${expected.total}, got ${found.cardsCount} ("${found.displayName}")`,
				),
			];

			expect(problems, problems.join("\n")).toEqual([]);
		});
	}
});
