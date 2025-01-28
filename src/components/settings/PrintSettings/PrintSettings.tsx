import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import S from "./PrintSettings.module.scss";

import { Checkbox, Row } from "@/components";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import {
	selectBleed,
	selectDoubleSided,
	setBleed,
	setDoubleSided,
} from "@/shared/store/features/print/print";
import { useTranslation } from "react-i18next";
import { selectExport } from "@/shared/store/features/app/app";

export type PrintSettingsProps = {};

export const PrintSettings = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const doubleSided = useAppSelector(selectDoubleSided);
	const useBleed = useAppSelector(selectBleed);
	const isExport = useAppSelector(selectExport);

	const toggleDoubleSided = () =>
		!isExport && dispatch(setDoubleSided(!doubleSided));
	const toggleBleed = () => !isExport && dispatch(setBleed(!useBleed));

	// const
	return (
		<Row gap={"responsive"}>
			<Checkbox
				onChange={toggleDoubleSided}
				checked={doubleSided}
				disabled={isExport}
				labelClassName={S.label}
			>
				{t("2 sides")}
			</Checkbox>
			<Checkbox
				onChange={toggleBleed}
				checked={useBleed}
				disabled={isExport}
				labelClassName={S.label}
			>
				{t("Bleed")}
			</Checkbox>
		</Row>
	);
};
