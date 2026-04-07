import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import { LocaleFragment } from "@/modules/core/i18n/shared/ui";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";
import * as L from "./links";

const paperSx = { p: 2, borderRadius: 2 } as const;

const externalLink = {
	target: "_blank" as const,
	rel: "noopener noreferrer" as const,
};

function StoreBadge({
	href,
	src,
	"aria-label": ariaLabel,
}: {
	href: string;
	src: string;
	"aria-label": string;
}) {
	return (
		<Link
			href={href}
			underline="hover"
			aria-label={ariaLabel}
			sx={{ display: "inline-flex", lineHeight: 0 }}
			{...externalLink}
		>
			<Box
				component="img"
				src={src}
				alt=""
				sx={{ height: 30, width: "auto", display: "block" }}
			/>
		</Link>
	);
}

export function Announces() {
	const { t } = useTranslation();
	const language = useAppSelector(selectCurrentLanguage);
	const unlockHref =
		language === "ru" ? L.boostyUnlockLink : L.patreonUnlockLink;

	return (
		<NotExportable>
			<Stack
				spacing={2}
				sx={{ maxWidth: "sm", mx: "auto", displayPrint: "none", pb: 3 }}
			>
				<Paper variant="outlined" elevation={0} sx={paperSx}>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={2}
						alignItems={{ sm: "center" }}
						justifyContent="space-between"
						sx={{ pb: 3 }}
					>
						<Stack spacing={0.5}>
							<Typography variant="caption" color="text.secondary">
								{t("My new project")}
							</Typography>
							<Typography variant="subtitle1" fontWeight={600} component="h2">
								{t("Digital Investigator Board")}
							</Typography>
						</Stack>

						<Row
							gap={2}
							flexWrap="wrap"
							alignItems="flex-start"
							justifyContent={{ xs: "flex-start", sm: "flex-end" }}
						>
							<StoreBadge
								href={L.playStoreHref}
								src="/images/assets/google-play.svg"
								aria-label="Google Play"
							/>
							<Stack
								alignItems="center"
								spacing={0.5}
								sx={{ position: "relative" }}
							>
								<StoreBadge
									href={L.appStoreHref}
									src="/images/assets/app-store.svg"
									aria-label="App Store"
								/>
								<Link
									href={unlockHref}
									variant="body2"
									underline="hover"
									sx={{
										position: "absolute",
										top: "100%",
										left: "50%",
										transform: "translateX(-50%)",
										mt: 0.5,
										whiteSpace: "nowrap",
									}}
									{...externalLink}
								>
									{t("iOS Unlock")}
								</Link>
							</Stack>
						</Row>
					</Stack>
				</Paper>

				<LocaleFragment onlyLanguages={["ru"]}>
					<Paper variant="outlined" elevation={0} sx={paperSx}>
						<Stack spacing={2}>
							<Alert severity="info" variant="outlined">
								Сообщество собирает средства на озвучку художественного текста в
								кампаниях и сценариях.
							</Alert>

							<Box>
								<Typography
									variant="subtitle2"
									color="text.secondary"
									gutterBottom
								>
									Сбор на озвучку
								</Typography>
								<Typography variant="body2">
									<Link
										href={L.boostyVoiceHref}
										underline="hover"
										{...externalLink}
									>
										Бусти
									</Link>{" "}
									(комиссия до 12%)
								</Typography>
								<Typography variant="body2">
									<Link
										href={L.tBankVoiceHref}
										underline="hover"
										{...externalLink}
									>
										Т-Банк
									</Link>
								</Typography>
							</Box>
						</Stack>
					</Paper>
				</LocaleFragment>
			</Stack>
		</NotExportable>
	);
}
