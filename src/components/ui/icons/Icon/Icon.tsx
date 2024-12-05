import { CustomIcon } from '@/components';
import { PropsWithClassName } from '@/types/util';
import { FontIcon } from '../FontIcon/FontIcon';
import { IconScale, IconScaleFactor, IconType } from '@/types/icons';
import { ImageIcon } from '../ImageIcon/ImageIcon';

export type IconProps = PropsWithClassName & {
	icon: string
	type?: IconType
	scale?: IconScale
	scaleFactor?: IconScaleFactor
}

export const Icon = ({ 
	icon,
	type,
	...props
}: IconProps) => {
	const isURL = icon.startsWith('blob:');
	const Component = (() => {
		if (isURL) {
			return CustomIcon
		}
		if (type === 'image') {
			return ImageIcon;
		}
		return FontIcon;
	})();

	return (
		<Component
			{...props}
			icon={icon}
		/>
	)
}