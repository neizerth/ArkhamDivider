import classNames from "classnames";
import type { PropsWithChildren } from "react";
import S from "./AppLoader.module.scss";

import { BASE_PATH } from "@/shared/config/app";

import { Progress } from "@/components";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import {
	selectExport,
	selectLoading,
	selectLoadingStatus,
} from "@/shared/lib/store/features/app/app";

const loader = `${BASE_PATH}images/loader.gif`;

export type AppLoaderProps = PropsWithChildren & {};

export const AppLoader = ({ children }: AppLoaderProps) => {
	const loading = useAppSelector(selectLoading);
	const isExport = useAppSelector(selectExport);
	const loadingStatus = useAppSelector(selectLoadingStatus);
	const containerClassNames = classNames(S.container, loading && S.loading);

	return (
		<div className={containerClassNames}>
			{!loading && children}
			{isExport && <div className={S.exportBlocker} />}
			{loading && (
				<div className={S.loader}>
					<img
						src={loader}
						className={S.loaderImage}
						alt="Application is loading..."
					/>
					{loadingStatus && (
						<div className={S.status}>
							<div className={S.progress}>
								<Progress value={loadingStatus.progress} />
							</div>
							{loadingStatus.text && (
								<div className={S.statusText}>{loadingStatus.text}</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};
