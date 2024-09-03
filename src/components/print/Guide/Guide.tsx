import S from './Guide.module.scss';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';

export type GuideProps = PropsWithClassName & {

}

export const Guide = ({ className }: GuideProps) => {
	return (
		<div className={classNames(S.container, className )}>
			<div className={S.lines}>
				<div className={S.horizontal}/>
				<div className={S.vertical}/>
			</div>
		</div>
	);
}