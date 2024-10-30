import { PropsWithChildren } from 'react';
import S from './AppLoader.module.scss';
import classNames from 'classnames';

import loader from './images/loader.gif';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLoading, selectLoadingStatus } from '@/store/features/app/app';
import { Progress } from '@/components';

export type AppLoaderProps = PropsWithChildren & {
	
}

export const AppLoader = ({ children }: AppLoaderProps) => {

  const loading = useAppSelector(selectLoading);
	const loadingStatus = useAppSelector(selectLoadingStatus);
	const containerClassNames = classNames(
		S.container, 
		loading && S.loading
	);
	
	return (
		<div className={containerClassNames}>
			{!loading && children}
			{loading && (
				<div className={S.loader}>
					<img src={loader} className={S.loaderImage} alt='Application is loading...'/>
					{loadingStatus && (
						<div className={S.status}>
							<div className={S.progress}>
								<Progress value={loadingStatus.progress}/>
							</div>
							{loadingStatus.text && (
								<div className={S.statusText}>
									{loadingStatus.text}
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}