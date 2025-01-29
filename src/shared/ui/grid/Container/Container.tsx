import type { PropsWithClassName } from "@/shared/model/types/util";
import classNames from "classnames";
import type { PropsWithChildren } from "react";
import S from "./Container.module.scss";

export type ContainerProps = PropsWithClassName & PropsWithChildren;

export const Container = ({ className, ...props }: ContainerProps) => {
	const classes = classNames(S.container, className);

	return <div className={classes} {...props} />;
};
