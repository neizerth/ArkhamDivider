import { ICustomContent } from "@/shared/types/api";
import S from "./StoryCustomContent.module.scss";
import { useTranslation } from "react-i18next";
import { PropsWithClassName } from "@/shared/types/util";
import classNames from "classnames";
import { Col, LanguageFlag } from "@/components";
import { prop } from "ramda";
import { selectLanguage } from "@/app/store/features/language/language";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Panel } from "@/components/ui/Panel/Panel";

export type StoryCustomContentProps = PropsWithClassName & {
	content: ICustomContent;
};

export const StoryCustomContent = ({
	content,
	className,
}: StoryCustomContentProps) => {
	const { t } = useTranslation();
	const language = useAppSelector(selectLanguage);

	const { creators, download_links } = content;
	const creator = creators.map(prop("name")).join(", ");
	const custom = { creator };

	const isTranslated =
		download_links.find((link) => language === link.language) !== undefined;

	return (
		<Col className={classNames(S.container, className)}>
			<div className={S.author}>
				{t("Fan-made scenario by {{custom.creator}}", { custom })}
			</div>
			{!isTranslated && (
				<Panel type="warning">
					Please, help me with the content translation to your language <br />
					Contact me using one of the links at the bottom of the page
				</Panel>
			)}
			<div className={S.download}>
				<div>{t("Download print and play cards")}:</div>
				<div className={S.links}>
					{download_links.map(({ links, language }) => (
						<div key={language}>
							{links.map((item, key) => (
								<div key={key} className={S.item}>
									<a
										className={S.link}
										href={item.link}
										title={item.name}
										target="_blank"
									>
										<LanguageFlag className={S.flag} language={language} />
										{item.name && `(${item.name})`}
									</a>
									{item.translated_by && (
										<div className={S.translatedBy}>
											<div className={S.translatedByContainer}>
												<div className={S.translatedByTitle}>
													{t("Translated by")}
												</div>
												<div className={S.translatedByUsers}>
													{item.translated_by.map((user) => (
														<a
															key={user.name}
															className={S.user}
															href={user.link}
															title={user.kind || user.name}
															target="_blank"
															rel="nofollow"
														>
															{user.name}
														</a>
													))}
												</div>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</Col>
	);
};
