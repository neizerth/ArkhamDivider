import { Checkbox } from "@/shared/ui/control/Checkbox/Checkbox";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectExport } from "@/shared/lib/store/features/app/app";
import {
	selectCornerRadius,
	setCornerRadius,
} from "@/shared/lib/store/features/print/print";
import S from "./CornerRadiusSettings.module.scss";
import icon from "./images/icon.svg";

export type CornerRadiusSettingsProps = {};

export const CornerRadiusSettings = ({}: CornerRadiusSettingsProps) => {
	const dispatch = useAppDispatch();
	const cornerRadius = useAppSelector(selectCornerRadius);
	const isExport = useAppSelector(selectExport);
	const onCheck = () => dispatch(setCornerRadius(!cornerRadius));

	return (
		<div className={S.container}>
			<Checkbox checked={cornerRadius} onChange={onCheck} disabled={isExport}>
				<img className={S.icon} src={icon} />
			</Checkbox>
		</div>
	);
};
