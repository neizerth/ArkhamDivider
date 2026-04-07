import { useMemo } from "react";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import type { UseDividerTextOptions } from "./useDividerText.types";

type Params = Record<string, string>;

/**
 * Computes the "seed" value for a text field.
 *
 * Responsibility:
 * - Decide whether the field is controlled by persisted divider params (`params[param]`).
 * - Produce a translated default text (`defaultCurrentValue`).
 * - Produce the actual seed value used to initialize/sync the editable value (`seedValue`).
 *
 * Notes:
 * - `custom: true` means "translate the provided `defaultValue` in story namespace".
 * - `custom: false` means "use `defaultValue` or translate `divider.title`".
 */
export function useDividerTextSeedValue<T>({
	divider,
	param,
	defaultValue: defaultValueProp,
	custom = false,
}: Pick<
	UseDividerTextOptions<T>,
	"divider" | "param" | "defaultValue" | "custom"
>) {
	const { story } = divider;
	const params = divider.params as unknown as Params | undefined;
	const persistedRaw = params?.[param];
	// Treat empty string as "not set" so the field can fall back to translated defaults.
	const persisted = persistedRaw === "" ? undefined : persistedRaw;
	const isControlledByParams = typeof persisted === "string";

	const { translateStory, i18n } = useStoryTranslation(story);

	// biome-ignore lint/correctness/useExhaustiveDependencies: language must trigger re-translation
	const defaultCurrentValue = useMemo(() => {
		if (custom) {
			return translateStory(defaultValueProp);
		}
		return defaultValueProp ?? translateStory(divider.title);
	}, [custom, defaultValueProp, divider.title, translateStory, i18n.language]);

	const seedValue = (persisted ?? defaultCurrentValue ?? "") as string;

	return {
		seedValue,
		defaultCurrentValue,
		isControlledByParams,
		persistedValue: persisted,
	};
}
