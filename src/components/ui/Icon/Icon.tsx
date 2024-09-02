import S from './Icon.module.scss';
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectEncounterSetIconName, selectIconSet } from "@/store/features/icons/icons";
import classNames from 'classnames';
import IcoMoon, { IconProps as IcoMoonProps } from "react-icomoon";

export type IconProps = IcoMoonProps & {
};

export const Icon = ({ icon, ...props }: IconProps) => {
	const iconSet = useAppSelector(selectIconSet);
	const iconName = useAppSelector<string>(selectEncounterSetIconName(icon));

	return (
		<>
			{iconSet && <IcoMoon 
				{...props} 
				icon={iconName}
				iconSet={iconSet} 
				className={classNames(S.icon, props.className)} 
			/>}
		</>
	)
}