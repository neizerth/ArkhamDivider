import { PropsWithChildren } from 'react';
import S from './AppLoader.module.scss';
import classNames from 'classnames';
import { useAppLoader } from '@/hooks/useAppLoader';

export type AppLoaderProps = PropsWithChildren & {
	
}

export const AppLoader = ({ children }: AppLoaderProps) => {

  const loading = useAppLoader();
	const containerClassNames = classNames(S.container, loading && S.loading);
	return (
		<div className={containerClassNames}>
			{!loading && children}
			{loading && <img src="/images/loader.gif" alt='Application is loading...'/>}
		</div>
	);
}