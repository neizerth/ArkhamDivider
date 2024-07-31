import S from './Icon.module.scss';
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIconSet } from "@/store/features/icons/icons";
import IcoMoon, { IconProps } from "react-icomoon";

const Icon = (props: IconProps) => {
	const iconSet = useAppSelector(selectIconSet);
	return (
		<div className={S.container}>
			{iconSet && <IcoMoon iconSet={iconSet} {...props} />}
		</div>
	)
}

export default Icon;