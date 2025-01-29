import { Button, Col, Icon, Row } from "@/components";
import { Popup, type PopupProps } from "@/components/ui/Popup/Popup";
import { getIconGroups } from "@/shared/lib/features/icons/getIconGroups";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useScrollSpy } from "@/shared/lib/hooks/useScollSpy";
import { clearActivePopupId } from "@/shared/lib/store/features/app/app";
import { selectEncounterSets } from "@/shared/lib/store/features/encounterSets/encounterSets";
import {
	selectIcons,
	selectPopupIcon,
	setPopupIcon,
} from "@/shared/lib/store/features/icons/icons";
import { selectStories } from "@/shared/lib/store/features/stories/stories";
import { ButtonType } from "@/shared/model/types/ui";
import classNames from "classnames";
import { createRef, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconSelectNav } from "../IconSelectNav/IconSelectNav";
import { IconSelectPreview } from "../IconSelectPreview/IconSelectPreview";
import { IconSelectView } from "../IconSelectView/IconSelectView";
import S from "./IconSelectPopup.module.scss";

export type IconSelectPopupProps = PopupProps & {};

export const IconSelectPopup = ({
	show,
	className,
	contentClassName,
}: IconSelectPopupProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const icons = useAppSelector(selectIcons);
	const stories = useAppSelector(selectStories);
	const encounterSets = useAppSelector(selectEncounterSets);

	const popupIcon = useAppSelector(selectPopupIcon);
	const [selectedIcon, selectIcon] = useState(popupIcon?.current);

	const iconGroups = getIconGroups({
		icons,
		stories,
		encounterSets,
	});

	const viewRef = useRef<HTMLDivElement>(null);
	const sectionRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

	if (sectionRefs.current.length === 0) {
		sectionRefs.current = iconGroups.map(() => createRef<HTMLDivElement>());
	}

	const activeSection = useScrollSpy({
		sectionElementRefs: sectionRefs.current,
		scrollingElement: viewRef,
		offsetPx: -400,
	});

	const close = () => dispatch(clearActivePopupId());
	const select = () => {
		dispatch(
			setPopupIcon({
				current: selectedIcon,
			}),
		);

		close();
	};
	const clear = () => {
		dispatch(
			setPopupIcon({
				current: popupIcon?.default,
			}),
		);

		close();
	};

	return (
		<Popup
			show={show}
			className={className}
			contentClassName={classNames(contentClassName, S.content)}
			scrollable={false}
		>
			<Col>
				<div className={S.row}>
					<div className={S.view}>
						{useMemo(
							() => (
								<IconSelectView
									iconGroups={iconGroups}
									ref={viewRef}
									sectionRefs={sectionRefs.current}
									defaultIcon={selectedIcon}
									onChange={selectIcon}
								/>
							),
							[sectionRefs, selectedIcon],
						)}
					</div>

					<Col className={S.sidebar}>
						<IconSelectPreview
							defaultIcon={selectedIcon}
							onChange={selectIcon}
						/>
						<div className={S.nav}>
							<IconSelectNav
								activeSection={activeSection}
								icon={selectedIcon}
								iconGroups={iconGroups}
								sectionRefs={sectionRefs.current}
							/>
						</div>
					</Col>
				</div>
				<Row className={S.actions}>
					<Row>
						<Button onClick={select}>
							<Icon icon="check-thin" />
							{t("Okay")}
						</Button>
					</Row>
					<Row>
						<Button onClick={clear} buttonType={ButtonType.DANGER}>
							<Icon icon={"repeat"} />
							{t("Default")}
						</Button>
						<Button buttonType={ButtonType.SECONDARY} onClick={close}>
							<Icon icon="dismiss" />
							{t("Close")}
						</Button>
					</Row>
				</Row>
			</Col>
		</Popup>
	);
};
