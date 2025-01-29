import type { PropsWithClassName } from "@/shared/model/types/util";
import S from "./CustomIcon.module.scss";

export type CustomIconProps = PropsWithClassName & {
	icon: string;
};

export const CustomIcon = ({ icon }: CustomIconProps) => {
	return <img src={icon} className={S.icon} />;
};
