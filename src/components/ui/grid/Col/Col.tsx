import S from "./Col.module.scss";
import { Row } from "@/components";
import { RowProps } from "../Row/Row";
import classNames from "classnames";

export type ColProps = RowProps;

export const Col = ({ children, className, ...props }: ColProps) => {
	return (
		<Row className={classNames(S.container, className)} {...props}>
			{children}
		</Row>
	);
};
