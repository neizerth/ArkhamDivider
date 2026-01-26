import useFitText from "use-fit-text";
import { BoxInput, type BoxInputProps } from "../BoxInput";

type UseFitTextOptions = Parameters<typeof useFitText>[0];

type FitInputProps = BoxInputProps & {
	fitTextOptions?: UseFitTextOptions;
};

export function FitInput({ fitTextOptions, ...props }: FitInputProps) {
	const { fontSize, ref } = useFitText(fitTextOptions);

	return <BoxInput {...props} ref={ref} fontSize={fontSize} />;
}
