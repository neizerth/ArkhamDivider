import S from './Icon.module.scss';
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectEncounterSetIconName, selectIconSet } from "@/store/features/icons/icons";
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';
import IcoMoon, { IconProps as IcoMoonProps } from "react-icomoon";

export type IconProps = IcoMoonProps & {
	containerClassName?: string
};

const Icon = ({ icon, containerClassName, ...props }: IconProps) => {
	const iconSet = useAppSelector(selectIconSet);
	const iconName = useAppSelector<string>(selectEncounterSetIconName(icon));

	return (
		<div className={classNames(S.container, containerClassName)} data-from={icon} data-to={iconName}>
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