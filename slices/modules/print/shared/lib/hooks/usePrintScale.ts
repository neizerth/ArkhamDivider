import { useAppSelector } from "@/shared/lib";
import { selectDPI } from "../store";
import { getBrowserDPI } from "../util";

const browserDPI = getBrowserDPI();

export const usePrintScale = () => {
	const dpi = useAppSelector(selectDPI);

	return browserDPI / dpi;
};
