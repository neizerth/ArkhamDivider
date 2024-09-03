import { PropsWithChildren } from 'react';
import S from './AppLoader.module.scss';
import classNames from 'classnames';
import { useAppLoader } from '@/hooks/useAppLoader';
import { BASE_PATH } from '@/constants/web';

export type AppLoaderProps = PropsWithChildren & {
	
}

export const AppLoader = ({ children }: AppLoaderProps) => {

  const loading = useAppLoader();
	const containerClassNames = classNames(S.container, loading && S.loading);
	const loader = BASE_PATH + '/images/loader.gif';
	
	return (
		<div className={containerClassNames}>
			{!loading && children}
			{loading && <img src={loader} alt='Application is loading...'/>}
		</div>
	);
}