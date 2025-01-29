import type { PropsWithClassName } from "@/shared/model/types/util";
import type { PropsWithChildren } from "react";
// import S from './List.module.scss';
import { Row } from "../Row/Row";

export type ListProps = PropsWithChildren & PropsWithClassName;

export const List = ({ ...props }: ListProps) => {
	return <Row wrap {...props} />;
};
