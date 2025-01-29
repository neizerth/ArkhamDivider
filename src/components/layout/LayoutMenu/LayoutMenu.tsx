import { useTranslation } from "react-i18next";
import S from "./LayoutMenu.module.scss";
import { Container } from "@/components";
import { PropsWithChildren } from "react";
import { LayoutType } from "@/shared/model/types/layouts";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import {
	selectLayout,
	selectType,
} from "@/shared/lib/store/features/layout/layout";
import classNames from "classnames";
import { useAppNavigate } from "@/shared/lib/hooks/useAppNavigate";
import { menu } from "./menu";

export type LayoutMenuItemProps = PropsWithChildren & {
	type: LayoutType;
	disabled?: boolean;
};

export const LayoutMenuItem = ({
	type,
	children,
	disabled,
}: LayoutMenuItemProps) => {
	const currentType = useAppSelector(selectType);
	const navigate = useAppNavigate();

	const isSelected = currentType === type;

	const classList = classNames(
		S.item,
		isSelected && S.selected,
		disabled ? S.disabled : S.enabled,
	);

	const select = () => {
		if (disabled) {
			return;
		}
		if (type === currentType) {
			return;
		}

		navigate({
			type,
			storyId: void 0,
		});
	};

	return (
		<div className={classList} onClick={select}>
			{children}
		</div>
	);
};

export type LayoutMenuProps = {};

export const LayoutMenu = ({}: LayoutMenuProps) => {
	const { t } = useTranslation();

	const { types } = useAppSelector(selectLayout);
	const getIsEnabled = (type: LayoutType) => types.includes(type);

	return (
		<div className={S.container}>
			<Container>
				<div className={S.menu}>
					{menu.map(({ type, name }) => (
						<LayoutMenuItem
							type={type}
							key={type}
							disabled={!getIsEnabled(type)}
						>
							{t(name)}
						</LayoutMenuItem>
					))}
				</div>
			</Container>
		</div>
	);
};
