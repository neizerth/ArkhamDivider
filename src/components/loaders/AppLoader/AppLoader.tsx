import { PropsWithChildren } from 'react';
import S from './AppLoader.module.scss';
import classNames from 'classnames';

import loader from './images/loader.gif';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLoading } from '@/store/features/app/app';

export type AppLoaderProps = PropsWithChildren & {
	
}

export const AppLoader = ({ children }: AppLoaderProps) => {

  const loading = useAppSelector(selectLoading);
	const containerClassNames = classNames(S.container, loading && S.loading);
	
	return (
		<div className={containerClassNames}>
			{!loading && children}
			{loading && <img src={loader} alt='Application is loading...'/>}
		</div>
	);
}