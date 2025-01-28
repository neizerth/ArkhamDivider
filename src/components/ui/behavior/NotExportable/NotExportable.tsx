// import S from './NotExportable.module.scss';

import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectExport } from "@/shared/store/features/app/app";
import { PropsWithChildren } from "react";

export const NotExportable = ({ children }: PropsWithChildren) => {
	const isExport = useAppSelector(selectExport);
	return <>{!isExport && children}</>;
};
