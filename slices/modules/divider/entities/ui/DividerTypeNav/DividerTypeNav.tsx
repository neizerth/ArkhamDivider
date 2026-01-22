import Tab from "@mui/material/Tab";
import Tabs, { type TabsProps } from "@mui/material/Tabs";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { dividerTypes } from "@/modules/divider/shared/config";
import {
	changeDividerType,
	selectDividerType,
	selectLayout,
} from "@/modules/divider/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

type DividerTypeNavProps = Omit<TabsProps, "value" | "onChange">;
export function DividerTypeNav(props: DividerTypeNavProps) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const selectedType = useAppSelector(selectDividerType);
	const layout = useAppSelector(selectLayout);
	const supportedTypes = layout?.types ?? [];
	const value = dividerTypes.indexOf(selectedType);

	const onChange = useCallback(
		(_: React.SyntheticEvent, value: number) => {
			const type = dividerTypes[value];
			dispatch(changeDividerType(type));
		},
		[dispatch],
	);

	return (
		<Tabs
			textColor="inherit"
			variant="scrollable"
			scrollButtons="auto"
			allowScrollButtonsMobile
			{...props}
			value={value}
			onChange={onChange}
		>
			{dividerTypes.map((type) => (
				<Tab
					key={type}
					label={t(`divider.type.${type}`)}
					disabled={!supportedTypes.includes(type)}
				/>
			))}
		</Tabs>
	);
}
