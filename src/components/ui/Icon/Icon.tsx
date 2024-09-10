import S from './Icon.module.scss';
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIconSet } from "@/store/features/icons/icons";
import classNames from 'classnames';
import IcoMoon, { IconProps } from "react-icomoon";


export const Icon = (props: IconProps) => {
	const iconSet = useAppSelector(selectIconSet);

	return (
		<>
			{iconSet && <IcoMoon 
				{...props} 
				iconSet={iconSet} 
				className={classNames(S.icon, props.className)} 
			/>}
		</>
	)
}