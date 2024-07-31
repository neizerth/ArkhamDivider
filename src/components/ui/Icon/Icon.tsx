import S from './Icon.module.scss';
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIconSet } from "@/store/features/icons/icons";
import classNames from 'classnames';
import IcoMoon, { IconProps } from "react-icomoon";

const Icon = (props: IconProps) => {
	const iconSet = useAppSelector(selectIconSet);
	return (
		<div className={S.container}>
			{iconSet && <IcoMoon 
				{...props} 
				iconSet={iconSet} 
				className={classNames(S.icon, props.className)} 
			/>}
		</div>
	)
}

export default Icon;