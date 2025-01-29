import { Icon } from "@/components";
import S from "./LayoutZoom.module.scss";
import Select from "react-select";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectZoom, setZoom } from "@/shared/lib/store/features/layout/layout";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { toArrayIf } from "@/shared/lib/features/util/common";
import { IS_DEVELOPMENT } from "@/shared/config/app";
import { useMemo } from "react";
import { getWebToPrintScale } from "@/shared/lib/features/util/units";
import { selectExport } from "@/shared/lib/store/features/app/app";

export type LayoutZoomProps = {};

const ZOOM_LEVELS = [100, 125, 150, 200, 250, 300, 350, 400];

export const LayoutZoom = ({}: LayoutZoomProps) => {
	const dispatch = useAppDispatch();
	const zoom = useAppSelector(selectZoom);
	const isExport = useAppSelector(selectExport);
	const webToPrintScale = useMemo(getWebToPrintScale, []) * 100;

	const LEVELS = [
		...ZOOM_LEVELS,
		...toArrayIf(IS_DEVELOPMENT, webToPrintScale),
	];

	const toOption = (value: number) => ({
		label: value === webToPrintScale ? "print" : `${value}%`,
		value,
	});
	const options = LEVELS.map(toOption);

	const value = toOption(zoom);

	const onChange = (zoom: number) => dispatch(setZoom(zoom));

	const goToIndex = (diff: number) => {
		const index = LEVELS.indexOf(zoom);
		const value = index + diff;

		if (value >= 0 && value < LEVELS.length) {
			return value;
		}
		if (diff < 0) {
			return 0;
		}
		return LEVELS.length - 1;
	};

	const goToZoom = (diff: number) => LEVELS[goToIndex(diff)];

	const zoomIn = () => !isExport && onChange(goToZoom(-1));
	const zoomOut = () => !isExport && onChange(goToZoom(1));

	return (
		<div className={S.container}>
			<div
				className={classNames(S.zoomButton, zoom === LEVELS[0] && S.disabled)}
				onClick={zoomIn}
			>
				<Icon icon="zoom-out" />
			</div>
			<Select
				isMulti={false}
				className={S.select}
				options={options}
				value={value}
				isDisabled={isExport}
				onChange={(item) => item && onChange(item.value)}
			/>
			<div
				className={classNames(
					S.zoomButton,
					zoom === LEVELS[LEVELS.length - 1] && S.disabled,
				)}
				onClick={zoomOut}
			>
				<Icon icon="zoom-in" className={S.zoomButton} />
			</div>
		</div>
	);
};
