import React, { FormEvent, PropsWithChildren } from 'react';
import IcoMoon from "react-icomoon";
import S from './Divider.module.scss';
import classNames from 'classnames';
import Icon from '@/components/ui/Icon/Icon';
import { useTranslation } from 'react-i18next';
import { I18N_NAMESPACE } from '@/constants/i18n';

export enum DividerType {
	GRAYSCALE = 'grayscale',
	COLOR = 'color',
}

export type DividerProps = PropsWithChildren & {
	id?: string
	name?: string
	type?: DividerType
	icon?: boolean
}

export const Divider = ({
	id = '',
	icon = true,
	name,
	children,
	type = DividerType.COLOR
}: DividerProps) => {
	const { t } = useTranslation(I18N_NAMESPACE.ENCOUNTER_SETS);

	const dividerName = name || (id && t(id));

	const className = classNames(
		S.container,
		S[`type_${type}`]
	);

	const onTitleChange = ({ target }: FormEvent) => {
		const { textContent } = target as HTMLElement;
	}

	return (
		<div className={className}>
			{/* <h3 className={S.title} contentEditable={true} onInput={onTitleChange}>{dividerName}</h3> */}
			<h3 className={S.title} data-id={id}>{dividerName}</h3>
			{icon && id && (
				<>
					<Icon icon={id} className={classNames(S.icon, S.icon_small)}/>
					<Icon icon={id} className={classNames(S.icon, S.icon_large)}/>
				</>
			)}
		</div>
	);
}