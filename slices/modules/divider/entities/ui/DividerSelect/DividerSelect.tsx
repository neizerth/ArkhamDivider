import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import {
	selectDividerVariant,
	setDividerVariant,
} from "@/modules/divider/shared/lib";
import { StoreSelect } from "@/shared/ui";
import * as C from "./DividerSelect.components";

type DividerSelectProps = FormControlProps;

export function DividerSelect(props: DividerSelectProps) {
	const { t } = useTranslation();
	const id = useId();

	const label = t(`Select Type`);

	return (
		<FormControl
			{...props}
			fullWidth
			sx={{ maxWidth: "250px", minWidth: "100px" }}
		>
			<InputLabel id={id}>{label}</InputLabel>
			<StoreSelect
				actionCreator={setDividerVariant}
				selector={selectDividerVariant}
				defaultValue={""}
				labelId={id}
				label={label}
				fullWidth
			>
				<ListSubheader>{t`Dividers`}</ListSubheader>
				<MenuItem value="classic">
					Classic&nbsp;
					<C.Contrast />
					<C.Vertical />
				</MenuItem>
				<MenuItem value="invocation-2018">
					Invocation 2018&nbsp;
					<C.Vertical />
				</MenuItem>
				<MenuItem value="arkhamesque">Arkhamesque Classic</MenuItem>
				<MenuItem value="eugene-sarnetsky">@sarnetsky</MenuItem>
				<MenuItem value="arkham-deco">
					Arkham Deco&nbsp;
					<C.Contrast />
					<C.Vertical />
				</MenuItem>
				<MenuItem value="3mm">
					3mm&nbsp;
					<C.Vertical />
				</MenuItem>
				<MenuItem value="vintage-tabbed">
					Vintage&nbsp;
					<C.Tab />
				</MenuItem>
				<ListSubheader>{t(`Bands`)}</ListSubheader>
				<MenuItem value="sarnetsky-bands">@sarnetsky</MenuItem>
				<ListSubheader>{t(`Stickers`)}</ListSubheader>
				<MenuItem value="divider-stickers">Deckbox</MenuItem>
				<MenuItem value="icon-stickers">{t(`Icon Stickers`)}</MenuItem>
				<ListSubheader>{t(`Album Bookmarks`)}</ListSubheader>
				<MenuItem value="classic-album">Classic</MenuItem>
				<MenuItem value="invocation-2018-album">Invocation 2018</MenuItem>
				<ListSubheader>{t(`Other`)}</ListSubheader>
				<MenuItem value="investigator-tokens">
					{t(`Investigator Tokens`)}
				</MenuItem>
			</StoreSelect>
		</FormControl>
	);
}
