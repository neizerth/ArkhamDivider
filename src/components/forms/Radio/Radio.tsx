import { CheckboxProps } from "../Checkbox/Checkbox";
import { Checkbox } from "@/components";

// import S from './Radio.module.scss';

export type RadioProps = CheckboxProps;

export const Radio = (props: RadioProps) => {
	return <Checkbox {...props} type="radio" />;
};
