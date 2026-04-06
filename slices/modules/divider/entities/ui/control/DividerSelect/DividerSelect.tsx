import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import {
	changeCategoryId,
	selectCategoryId,
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
				actionCreator={changeCategoryId}
				selector={selectCategoryId}
				defaultValue={""}
				labelId={id}
				label={label}
				fullWidth
			>
				<C.Subheader>{t`Dividers`}</C.Subheader>
				<MenuItem value="chapter2">{t(`divider.chapter2.name`)}</MenuItem>
				<MenuItem value="classic">{t(`Return To`)}</MenuItem>
				<MenuItem value="invocation-2018">Invocation 2018</MenuItem>
				<MenuItem value="arkhamesque-classic">Arkhamesque Classic</MenuItem>
				<MenuItem value="ryno">Ryno</MenuItem>
				<MenuItem value="sarnetsky">{t(`Eugene Sarnetsky`)}</MenuItem>
				<MenuItem value="arkham-deco">Arkham Deco</MenuItem>
				<MenuItem value="3mm">3mm</MenuItem>
				<MenuItem value="vintage">Vintage</MenuItem>
				<C.Subheader>{t(`Bands`)}</C.Subheader>

				<MenuItem value="sarnetsky-band">{t(`Eugene Sarnetsky`)}</MenuItem>
				<C.Subheader>{t(`Stickers`)}</C.Subheader>
				<MenuItem value="tcg-divider-sticker">
					{t(`category.tcg-divider-sticker.name`)}
				</MenuItem>
				<C.Subheader>{t(`Other`)}</C.Subheader>
				<MenuItem value="investigator-tokens">
					{t(`Investigator Tokens`)}
				</MenuItem>

				{/*
				<MenuItem value="icon-stickers">{t(`Icon Stickers`)}</MenuItem>
				<MenuItem value="bookmark-stickers">{t(`Bookmark Stickers`)}</MenuItem>
				<ListSubheader>{t(`Album Bookmarks`)}</ListSubheader>
				<MenuItem value="classic-album">Classic</MenuItem>
				<MenuItem value="invocation-2018-album">Invocation 2018</MenuItem>
				 */}
			</StoreSelect>
		</FormControl>
	);
}
