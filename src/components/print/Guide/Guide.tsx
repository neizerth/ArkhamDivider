import { GuideType } from '@/shared/types/print';
import S from './Guide.module.scss';
import { PropsWithClassName } from '@/shared/types/util';
import classNames from 'classnames';

export type GuideProps = PropsWithClassName & {
	type?: GuideType;
	inset?: boolean;
}

export const Guide = ({ 
	className,
	type = 'cross'
}: GuideProps) => {
	return (
		<div className={classNames(
				S.container,
				S[type],
				className
			)}
		>
			<div className={S.lines}>
				<div className={S.horizontal}/>
				<div className={S.vertical}/>
			</div>
		</div>
	);
}