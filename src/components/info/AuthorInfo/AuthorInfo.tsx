import { Icon } from "@/components";
import type { ILayoutAuthor } from "@/shared/model/types/layouts";
import { useTranslation } from "react-i18next";
import S from "./AuthorInfo.module.scss";

export type AuthorInfoProps = {
	author: ILayoutAuthor;
};

export const AuthorInfo = ({ author }: AuthorInfoProps) => {
	const { t } = useTranslation();
	return (
		<div className={S.container}>
			<div className={S.info}>
				<div className={S.authorContent}>
					{author.image && (
						<img className={S.image} src={author.image} alt={author.name} />
					)}
					<div className={S.about}>
						<h3 className={S.name}>{author.name}</h3>
						{author.contacts && (
							<div className={S.contacts}>
								{author.contacts.map((contact) => (
									<a
										href={contact.url}
										target="_blank"
										className={S.contact}
										title={contact.title}
										key={contact.id}
										rel="noreferrer"
									>
										<Icon icon={contact.icon} />
									</a>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{author.donationUrl && (
				<div className={S.donate}>
					<a
						className={S.button}
						href={author.donationUrl}
						target="_blank"
						rel="noreferrer"
					>
						{t("Support the author")}
					</a>
				</div>
			)}
		</div>
	);
};
