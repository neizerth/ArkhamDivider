import { Checkbox } from "@/components";
import type { CheckboxProps } from "@/shared/ui";

// import S from './Radio.module.scss';

export type RadioProps = CheckboxProps;

export const Radio = (props: RadioProps) => {
	return <Checkbox {...props} type="radio" />;
};
