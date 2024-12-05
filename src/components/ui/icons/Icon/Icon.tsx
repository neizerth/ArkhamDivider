import { CustomIcon } from '@/components';
import { PropsWithClassName } from '@/types/util';
import { FontIcon } from '../FontIcon/FontIcon';
import { IconScaleType } from '@/types/icons';

export type IconProps = PropsWithClassName & {
	icon: string
	scaleType?: IconScaleType
	scaleFactor?: number
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