import { CustomIcon } from '@/components';
import { PropsWithClassName } from '@/types/util';
import { FontIcon } from '../FontIcon/FontIcon';

export type IconProps = PropsWithClassName & {
	icon: string
}

export const Icon = ({ 
	icon, 
	className, 
}: IconProps) => {
	const isURL = icon.startsWith('blob:');
	const Component = isURL ? CustomIcon : FontIcon;

	return (
		<Component
			className={className}
			icon={icon}
		/>
	)
}