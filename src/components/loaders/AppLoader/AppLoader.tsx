import { PropsWithChildren } from 'react';
import S from './AppLoader.module.scss';
import classNames from 'classnames';

export type AppLoaderProps = PropsWithChildren & {
	loading?: boolean
}

export const AppLoader = ({ loading = true, children }: AppLoaderProps) => {
	const containerClassNames = classNames(S.container, loading && S.loading);
	return (
		<div className={containerClassNames}>
			{!loading && children}
			{loading && <img src="/images/loader.gif" alt='Application is loading...'/>}
		</div>
	);
}