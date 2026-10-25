import type { ArkhamDivider } from "arkham-divider-data";
import { getCampaignDividers } from "@/modules/divider/entities/lib/store/features/generateScenarioDividers/lib/getCampaignDividers";
import { getEncounterSetDividers } from "@/modules/divider/entities/lib/store/features/generateScenarioDividers/lib/getEncounterSetDividers";
import { getScenarioDividers } from "@/modules/divider/entities/lib/store/features/generateScenarioDividers/lib/getScenarioDividers";
import type { Divider } from "@/modules/divider/shared/model";
import { createStoryWithRelations } from "@/modules/story/entities/lib/logic/createStoryWithRelations";
import type { Story } from "@/modules/story/shared/model";

export type ExpectedDivider = {
	section: "campaign" | "scenarios" | "encounters" | "extra";
	name: string;
	investigators: number;
	story: number;
	encounter: number;
	total: number;
};

export type ExpectedCampaign = {
	name: string;
	code: string;
	dividers: ExpectedDivider[];
};

export type Translation = {
	campaigns?: Record<string, string>;
	stories?: Record<string, string>;
	scenarios?: Record<string, string>;
	encounterSets?: Record<string, string>;
};

/** Excel typos / alternate Russian names → canonical match keys */
export const NAME_ALIASES: Record<string, string[]> = {
	"Ночь фанатички. Часть I. Встреча": ["Встреча"],
	"Ночь фанатички. Часть II. Полуночные маски": ["Полуночные маски"],
	"Ночь фанатички. Часть III. Пожиратели из глубин": ["Пожиратель из глубин"],
	"Часть I. Встреча": ["Встреча. Возвращение"],
	"Часть II. Полуночные маски": ["Полуночные маски. Возвращение"],
	"Часть III. Пожиратели из глубин": ["Пожиратель из глубин. Возвращение"],
	"Ночь фанатички. Возвращение": [
		"Return to the Night of the Zealot",
		"Ночь фанатички. Возвращение",
	],
	"0, пролог. Исчехзновение в поместье Сумерек": [
		"Исчезновение в поместье Сумерек",
	],
	"По тонкомулду": ["По тонкому льду"],
	"Сокрытые карты": ["Concealed Cards", "Сокрытые карты"],
	"Текели-ли": ["Tekeli-Li", "Текели-ли"],
	"День первый": ["Первый день"],
	"День второй": ["Второй день"],
	"День третий": ["Последний день"],
	"Пожиратели снов": ["The Dream-Eaters", "Пожиратели снов"],
	"Алые ключи. Кампания": ["Алые ключи"],
	"Пир в Хемлок-Вейл. Кампания": ["Пир в Хемлок-Вейл"],
	"V. Сердце древних": ["Сердце древних", "Heart of the Elders"],
	"V. Сердце древних ч.1": ["Столпы судьбы. Возвращение"],
	"V. Сердце древних ч.2": ["К'ньян. Возвращение", "Кньян. Возвращение"],
};

export const OFFICIAL_CAMPAIGN_CODES = [
	"core",
	"rtnotz",
	"dwl",
	"rtdwl",
	"ptc",
	"rtptc",
	"tfa",
	"rttfa",
	"tcu",
	"rttcu",
	"eoe",
	"tsk",
	"fhv",
	"tde",
	"tic",
	"tdc",
] as const;

export const normalizeName = (value: string) =>
	value
		.toLowerCase()
		.replace(/ё/g, "е")
		.replace(/["«»„“”']/g, "")
		.replace(/[.:,;—–\-!?]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

const stripNoise = (value: string) =>
	value
		.replace(/^[IVXLC]+[-.]?\s*[a-zа-я]?\.\s*/i, "")
		.replace(/^часть\s+[IVXLC0-9]+\.?\s*/i, "")
		.replace(/^сценарий\s+[IVXLC0-9\-а-яa-z]*[:.\s]*/i, "")
		.replace(/^пролог[,:\s]*/i, "")
		.replace(/^эпилог[:.\s]*/i, "")
		.replace(/\.?\s*кампания$/i, "")
		.replace(/\.?\s*возвращение$/i, "")
		.trim();

/** "Ночь фанатички. Часть I. Встреча" → "Встреча" */
const trailingTitle = (value: string) => {
	const part = value.match(/часть\s+[IVXLC0-9]+[.\s]+(.+)$/i);
	return part?.[1]?.trim() ?? value;
};

export const nameKeys = (value: string) => {
	const aliases = NAME_ALIASES[value] ?? [];
	const values = [value, ...aliases];
	const keys = new Set<string>();
	for (const item of values) {
		keys.add(normalizeName(item));
		keys.add(normalizeName(stripNoise(item)));
		keys.add(normalizeName(trailingTitle(item)));
		keys.add(normalizeName(stripNoise(trailingTitle(item))));
	}
	return [...keys].filter(Boolean);
};

const sectionAllowsType = (
	section: ExpectedDivider["section"],
	divider: Divider,
) => {
	if (section === "campaign") {
		return divider.type === "campaign";
	}
	if (section === "scenarios") {
		return divider.type === "scenario" || divider.type === "encounter";
	}
	return divider.type === "encounter";
};

const lookupTranslation = (
	title: string,
	dict?: Record<string, string>,
): string | undefined => {
	if (!dict) {
		return;
	}
	if (dict[title]) {
		return dict[title];
	}
	const lower = title.toLowerCase();
	for (const [key, value] of Object.entries(dict)) {
		if (key.toLowerCase() === lower) {
			return value;
		}
	}
};

export const translateDividerTitle = (
	divider: Divider,
	ru: Translation,
): string => {
	const title = divider.title ?? "";
	if (divider.type === "campaign") {
		return (
			lookupTranslation(title, ru.campaigns) ??
			lookupTranslation(title, ru.stories) ??
			title
		);
	}
	if (divider.type === "scenario") {
		return lookupTranslation(title, ru.scenarios) ?? title;
	}
	return lookupTranslation(title, ru.encounterSets) ?? title;
};

export type ActualDivider = {
	divider: Divider;
	displayName: string;
	cardsCount: number;
	used: boolean;
};

export const generateCampaignDividers = (
	storyCode: string,
	core: ArkhamDivider.Core,
): Divider[] => {
	const stories = core.stories.map((story) => ({
		...story,
		id: story.code,
		translated: false,
	})) as Story[];

	const story = createStoryWithRelations({
		code: storyCode,
		stories,
		encounterSets: core.encounterSets,
	});

	if (!story) {
		throw new Error(`Story not found: ${storyCode}`);
	}

	return [
		...getCampaignDividers({ story, includeReturnStory: false }),
		...getEncounterSetDividers({
			story,
			includeEncounterSets: true,
			includeScenarioEncounterSets: false,
			includeExtraEncounterSets: true,
			includeReturnStory: false,
		}),
		...getScenarioDividers({
			story,
			exceptEncounterCards: false,
			includeReturnStory: false,
		}),
	];
};

const scoreNameMatch = (expected: string, actual: string): number => {
	const expectedKeys = nameKeys(expected);
	const actualKeys = nameKeys(actual);

	let best = 0;
	for (const left of expectedKeys) {
		for (const right of actualKeys) {
			if (left === right) {
				best = Math.max(best, 100);
				continue;
			}
			// Containment only when both sides are reasonably specific.
			if (Math.min(left.length, right.length) < 6) {
				continue;
			}
			if (left.includes(right) || right.includes(left)) {
				const ratio =
					Math.min(left.length, right.length) /
					Math.max(left.length, right.length);
				best = Math.max(best, Math.round(40 + ratio * 40));
			}
		}
	}
	return best;
};

export const matchExpectedDividers = (
	expected: ExpectedDivider[],
	actual: ActualDivider[],
) => {
	const missing: ExpectedDivider[] = [];
	const mismatches: Array<{
		expected: ExpectedDivider;
		actual: ActualDivider;
	}> = [];

	// Excel "другие наборы" lists full/set sizes; the client correctly shows
	// partial `encounter_set_data.size` — skip extras in this comparison.
	const comparable = expected.filter((item) => item.section !== "extra");

	for (const item of comparable) {
		const candidates = actual
			.map((candidate, index) => ({ candidate, index }))
			.filter(
				({ candidate }) =>
					!candidate.used &&
					!(
						candidate.divider.type === "encounter" && candidate.divider.isExtra
					) &&
					sectionAllowsType(item.section, candidate.divider),
			)
			.map(({ candidate, index }) => ({
				candidate,
				index,
				score: scoreNameMatch(item.name, candidate.displayName),
				countMatch: candidate.cardsCount === item.total ? 1 : 0,
			}))
			.filter(({ score }) => score >= 40)
			.sort(
				(a, b) =>
					b.countMatch - a.countMatch || b.score - a.score || a.index - b.index,
			);

		const best = candidates[0];
		if (!best) {
			missing.push(item);
			continue;
		}

		best.candidate.used = true;
		if (best.candidate.cardsCount !== item.total) {
			mismatches.push({
				expected: item,
				actual: best.candidate,
			});
		}
	}

	return {
		missing,
		mismatches,
		extra: actual.filter((item) => !item.used),
	};
};
