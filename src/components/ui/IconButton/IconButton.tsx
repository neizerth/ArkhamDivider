import { Button, Icon } from "@/components";
import classNames from "classnames";
import S from "./IconButton.module.scss";

export type IconButtonProps = React.ComponentProps<typeof Button> & {
	icon: string;
	iconClassName?: string;
};

export const IconButton = ({
	className,
	iconClassName,
	children,
	icon,
	...props
}: IconButtonProps) => {
	return (
		<Button {...props} className={classNames(S.container, className)}>
			<Icon icon={icon} className={classNames(S.icon, iconClassName)} />
			{children}
		</Button>
	);
};
