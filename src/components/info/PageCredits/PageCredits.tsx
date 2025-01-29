import { Icon, Row } from "@/components";
import { BOOSTY_LINK } from "@/shared/config/app";
import { getCategoryById } from "@/shared/lib/features/layouts/common";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectLanguage } from "@/shared/lib/store/features/language/language";
import { selectCategoryId } from "@/shared/lib/store/features/layout/layout";
import type { PropsWithClassName } from "@/shared/model/types/util";
import classNames from "classnames";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import S from "./PageCredits.module.scss";

export const CREDITS_HEIGHT = 20;

export type PageCreditsLocalProps = PropsWithClassName & {
	link: string;
	name: string;
	authorLink?: string;
};

export const PageCreditsGlobal = ({
	link,
	authorLink,
	name,
}: PageCreditsLocalProps) => (
	<Row className={S.row} gap={false}>
		<QRCodeSVG value={link} className={S.qr} />
		<div>
			<span className={S.symbol}>
				<Icon icon="free" className={classNames(S.icon, S.freeIcon)} />:
			</span>
			Spend as many resources as you want&nbsp;to&nbsp;
			<a href={link} target="_blank" rel="noreferrer">
				{link}
			</a>
			<br />
			Remember that{" "}
			<i>
				{authorLink ? (
					<a
						href={authorLink}
						target="_blank"
						className={S.author}
						rel="noreferrer"
					>
						{name}
					</a>
				) : (
					name
				)}{" "}
				is grateful to you
			</i>
		</div>
	</Row>
);

export const PageCreditsRU = ({
	link,
	authorLink,
	name,
}: PageCreditsLocalProps) => (
	<Row className={S.row} gap={false}>
		<QRCodeSVG value={link} className={S.qr} />
		<div>
			<span className={S.symbol}>
				<Icon icon="free" className={classNames(S.icon, S.freeIcon)} />:
			</span>
			Вы можете потратить любое число ресурсов на{" "}
			<a href={link} target="_blank" rel="noreferrer">
				{link}
			</a>
			<br />
			Запомните, что{" "}
			<i>
				{authorLink ? <a href={authorLink}>{name}</a> : name} вам благодарен
			</i>
		</div>
	</Row>
);

export type PageCreditsProps = PropsWithClassName & {};

export const PageCredits = ({ className }: PageCreditsProps) => {
	const language = useAppSelector(selectLanguage);
	const categoryId = useAppSelector(selectCategoryId);
	const { t } = useTranslation();

	const author = categoryId && getCategoryById(categoryId)?.author;

	const Component = language === "ru" ? PageCreditsRU : PageCreditsGlobal;

	return (
		<div className={classNames(S.container, className)}>
			<div className={S.author}>
				{author?.donationUrl && (
					<Component
						link={author.donationUrl}
						authorLink={author.url}
						name={author.name}
					/>
				)}
			</div>
			<div className={S.support}>
				<div className={S.supportContent}>
					<span>{t("Support project on Boosty")}</span>
					<a
						href={BOOSTY_LINK}
						target="_blank"
						className={S.supportLink}
						rel="noreferrer"
					>
						{BOOSTY_LINK}
					</a>
				</div>
				<QRCodeSVG value={BOOSTY_LINK} className={S.qr} />
			</div>
		</div>
	);
};
