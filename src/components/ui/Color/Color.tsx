import classNames from "classnames";
import S from "./Color.module.scss";

export type ColorProps = React.ComponentProps<"div"> & {
	color: string;
};

export const Color = ({ color, ...props }: ColorProps) => {
	const styles = {
		backgroundColor: color,
	};
	return (
		<div
			{...props}
			className={classNames(S.container, props.className)}
			style={styles}
		/>
	);
};
