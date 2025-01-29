import { Defined } from "@/shared/model/types/util";
import S from "./XPSlider.module.scss";
import ReactSlider, { ReactSliderProps } from "react-slider";
import classNames from "classnames";
import { MAX_XP } from "@/shared/config/xp";

export type XPSliderTrackDefinition = Defined<
	ReactSliderProps<number[]>["renderTrack"]
>;

export const XPSliderTrack: XPSliderTrackDefinition = (
	{ className, ...props },
	state,
) => {
	const { index } = state;
	const trackIds = ["before", "active", "after"];
	const trackId = trackIds[index] || "area";
	return (
		<div
			{...props}
			key={index}
			className={classNames(S.track, S[`track_${trackId}`], className)}
		/>
	);
};

export type XPSliderThumbDefinition = Defined<
	ReactSliderProps<number[]>["renderThumb"]
>;

export const XPSliderThumb: XPSliderThumbDefinition = (
	{ className, ...props },
	state,
) => {
	const { index } = state;
	return (
		<div {...props} className={classNames(S.thumb, className)} key={index}>
			{state.valueNow}
		</div>
	);
};

export type XPSliderProps = {
	onChange: (value: [number, number]) => void;
	defaultValue?: [number, number];
};

export const XPSlider = ({ onChange, defaultValue }: XPSliderProps) => {
	return (
		<div className={S.container}>
			<ReactSlider
				className={S.slider}
				minDistance={1}
				min={0}
				max={MAX_XP}
				onChange={onChange}
				defaultValue={defaultValue}
				renderTrack={XPSliderTrack}
				renderThumb={XPSliderThumb}
			/>
		</div>
	);
};
