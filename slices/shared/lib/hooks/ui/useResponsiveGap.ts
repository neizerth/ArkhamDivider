import { useFlexGap } from "./useFlexGap";

type Segments = Record<string, number>;
type ResponsiveGap = Record<string, string>;

export function useResponsiveGap(spacing = 2) {
	const setSegment = useFlexGap(spacing);
	return (segments: Segments) => {
		return Object.entries(segments).reduce((acc, [key, value]) => {
			acc[key] = setSegment(value);
			return acc;
		}, {} as ResponsiveGap);
	};
}
