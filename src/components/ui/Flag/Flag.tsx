import { PropsWithClassName } from "@/shared/model/types/util";
// import S from './Flag.module.scss';

export type FlagProps = PropsWithClassName & {
	code: string;
};

export const Flag = ({ className, code }: FlagProps) => {
	const src = `/images/flags/${code.toUpperCase()}.svg`;
	return <img className={className} src={src} alt={code} />;
};
