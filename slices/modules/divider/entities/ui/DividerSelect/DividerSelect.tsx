import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useId } from "react";
import { useTranslation } from "react-i18next";

import * as C from "./DividerSelect.components";

type DividerSelectProps = FormControlProps;

export function DividerSelect(props: DividerSelectProps) {
	const { t } = useTranslation();
	const id = useId();

	const label = t(`Type`);

	return (
		<FormControl
			{...props}
			fullWidth
			sx={{ maxWidth: "200px", minWidth: "80px" }}
		>
			<InputLabel id={id}>{label}</InputLabel>
			<Select labelId={id} label={label} fullWidth>
				<ListSubheader>{t`Dividers`}</ListSubheader>
				<MenuItem value="return-to">Classic</MenuItem>
				<MenuItem value="invocation-2018">Invocation 2018</MenuItem>
				<MenuItem value="arkhamesque">Arkhamesque Classic</MenuItem>
				<MenuItem value="eugene-sarnetsky">@sarnetsky</MenuItem>
				<MenuItem value="arkham-deco">Arkham Deco</MenuItem>
				<MenuItem value="3mm">3mm</MenuItem>
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
				<MenuItem value="classic-bookmarks">Classic</MenuItem>
				<MenuItem value="invocation-2018-bookmarks">Invocation 2018</MenuItem>
				<ListSubheader>{t(`Other`)}</ListSubheader>
				<MenuItem value="investigator-tokens">
					{t(`Investigator Tokens`)}
				</MenuItem>
			</Select>
		</FormControl>
	);
}
