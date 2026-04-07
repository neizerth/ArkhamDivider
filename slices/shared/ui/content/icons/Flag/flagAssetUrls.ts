/** Only flags used by `languageLabels` — avoids pulling in full `flag-icons` CSS (hundreds of SVGs). */
import cn from "flag-icons/flags/4x3/cn.svg?url";
import de from "flag-icons/flags/4x3/de.svg?url";
import es from "flag-icons/flags/4x3/es.svg?url";
import fr from "flag-icons/flags/4x3/fr.svg?url";
import it from "flag-icons/flags/4x3/it.svg?url";
import kr from "flag-icons/flags/4x3/kr.svg?url";
import pl from "flag-icons/flags/4x3/pl.svg?url";
import pt from "flag-icons/flags/4x3/pt.svg?url";
import ru from "flag-icons/flags/4x3/ru.svg?url";
import us from "flag-icons/flags/4x3/us.svg?url";
import vn from "flag-icons/flags/4x3/vn.svg?url";

export const flagAssetUrlByIso: Record<string, string> = {
	us,
	es,
	de,
	it,
	fr,
	kr,
	pl,
	pt,
	ru,
	vn,
	cn,
};
