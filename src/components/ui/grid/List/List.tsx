import { PropsWithChildren } from "react";
// import S from './List.module.scss';
import { Row } from "../Row/Row";
import { PropsWithClassName } from "@/shared/types/util";

export type ListProps = PropsWithChildren & PropsWithClassName;

export const List = ({ ...props }: ListProps) => {
	return <Row wrap {...props} />;
};
