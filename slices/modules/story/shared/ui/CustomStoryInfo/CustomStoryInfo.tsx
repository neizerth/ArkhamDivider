import Alert from "@mui/material/Alert";
import Box, { type BoxProps } from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { prop } from "ramda";
import { useTranslation } from "react-i18next";
import { selectLanguage } from "@/modules/core/i18n/shared/lib";
import { selectStory } from "@/modules/story/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Flag, Row } from "@/shared/ui";
import type { StoryCustomContent } from "../../model";

type CustomStoryInfoProps = Omit<BoxProps, "content"> & {
	content: StoryCustomContent;
};

export function CustomStoryInfo({
	content,
	...boxProps
}: CustomStoryInfoProps) {
	const { t } = useTranslation();
	const story = useAppSelector(selectStory);
	const language = useAppSelector(selectLanguage) ?? "en";

	const { creators, download_links } = content;
	const creator = creators.map(prop("name")).join(", ");

	const isTranslated =
		story?.translated === true ||
		download_links.some((link) => language === link.language);

	return (
		<Box {...boxProps}>
			<Paper
				elevation={0}
				sx={{
					p: 2,
					borderRadius: 2,
					bgcolor: "background.paper",
					boxShadow: `0 1px 3px rgba(0,0,0,0.08)`,
				}}
			>
				<Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
					{t("customStory.fanMadeBy", { creator })}
				</Typography>

				{!isTranslated && (
					<Alert severity="warning" sx={{ mb: 2 }}>
						{t("customStory.translationHelp")}
					</Alert>
				)}

				<Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
					<Typography component="span">{t("customStory.download")}:</Typography>
					<Row direction="row" alignItems="center" gap={1.5} flexWrap="wrap">
						{download_links.map(({ links, language: lang }) => {
							const translators = links.flatMap(
								(item) => item.translated_by ?? [],
							);
							const flagLink = (
								<Link
									key={lang}
									href={links[0]?.link}
									target="_blank"
									rel="noopener noreferrer"
									underline="none"
									sx={{ display: "inline-flex", alignItems: "center" }}
								>
									<Box
										component="span"
										sx={{
											fontSize: "1.75rem",
											lineHeight: 1,
											padding: 0.5,
											background: (theme) => theme.palette.grey[300],
											borderRadius: 1,
										}}
									>
										<Flag code={lang} />
									</Box>
								</Link>
							);

							if (translators.length === 0) {
								return flagLink;
							}

							return (
								<Tooltip
									key={lang}
									title={
										<Stack spacing={0.5} sx={{ py: 0.5 }}>
											<Typography variant="caption" fontWeight={600}>
												{t("customStory.translatedBy")}
											</Typography>
											<Stack direction="row" flexWrap="wrap" gap={0.5}>
												{translators.map((user) => (
													<Link
														key={user.name}
														href={user.link}
														title={user.kind ?? user.name}
														target="_blank"
														rel="nofollow noopener noreferrer"
														underline="hover"
														sx={{
															fontSize: "inherit",
															color: "primary.light",
														}}
													>
														{user.name}
													</Link>
												))}
											</Stack>
										</Stack>
									}
									placement="top"
									arrow
								>
									{flagLink}
								</Tooltip>
							);
						})}
					</Row>
				</Stack>
			</Paper>
		</Box>
	);
}
