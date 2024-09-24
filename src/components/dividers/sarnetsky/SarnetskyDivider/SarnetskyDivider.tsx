import { IDivider } from '@/types/dividers';
import S from './SarnetskyDivider.module.scss';
import { Guides } from '@/components';

export type SarnetskyDividerProps = IDivider & {

}

export const SarnetskyDivider = ({

}: SarnetskyDividerProps) => {
  return (
    <div 
			className={containerClassName} 
		>
			<div className={S.guides}>
				<Guides className={S.guidesContent}/>
			</div>
			<div className={S.wrapper}>
				<div className={S.divider}>
          
        </div>
      </div>
    </div>
  );
}