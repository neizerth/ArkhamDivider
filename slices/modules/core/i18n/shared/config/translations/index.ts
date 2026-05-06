import type { Translation } from "../../model";
import de from "./de.json";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import it from "./it.json";
import ko from "./ko.json";
import pl from "./pl.json";
import ru from "./ru.json";
import zh from "./zh.json";
import zh_cn from "./zh_cn.json";

export const translations: Record<string, Translation> = {
	en,
	ru,
	de,
	fr,
	pl,
	es,
	ko,
	it,
	zh,
	zh_cn,
};
