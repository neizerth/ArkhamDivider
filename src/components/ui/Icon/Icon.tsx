import S from './Icon.module.scss';
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectEncounterSetIconName, selectIconSet } from "@/store/features/icons/icons";
import classNames from 'classnames';
import IcoMoon, { IconProps } from "react-icomoon";

const Icon = ({ icon, ...props }: IconProps) => {
	const iconSet = useAppSelector(selectIconSet);
	const iconName = useAppSelector<string>(selectEncounterSetIconName(icon));

	return (
		<div className={S.container} data-from={icon} data-to={iconName}>
			{iconSet && <IcoMoon 
				{...props} 
				icon={iconName}
				iconSet={iconSet} 
				className={classNames(S.icon, props.className)} 
			/>}
		</div>
	)
}

export default Icon;