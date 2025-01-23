import { CustomIcon } from '@/components';
import { PropsWithClassName } from '@/shared/types/util';
import { FontIcon } from '../FontIcon/FontIcon';
import { IconScaleFactor, IconScaleType } from '@/shared/types/icons';

export type IconProps = PropsWithClassName & {
	icon: string
	scaleType?: IconScaleType
	scaleFactor?: IconScaleFactor
}

export const Icon = ({ 
	icon, 
	...props
}: IconProps) => {
	const isURL = icon.startsWith('blob:');
	const Component = isURL ? CustomIcon : FontIcon;

	return (
		<Component
			{...props}
			icon={icon}
		/>
	)
}