import { Row } from "@/components";
import classNames from "classnames";
import type { RowProps } from "../Row/Row";
import S from "./Col.module.scss";

export type ColProps = RowProps;

export const Col = ({ children, className, ...props }: ColProps) => {
	return (
		<Row className={classNames(S.container, className)} {...props}>
			{children}
		</Row>
	);
};
