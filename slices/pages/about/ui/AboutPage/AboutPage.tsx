import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import { contentByLanguage } from "@/pages/about/content/contentByLanguage";
import { useAppSelector } from "@/shared/lib";
import { Article } from "@/shared/ui";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";

export function AboutPage() {
	const { t } = useTranslation();
	const language = useAppSelector(selectCurrentLanguage);
	const content = contentByLanguage[language] ?? contentByLanguage.en;

	return (
		<SingleColumnLayout>
			<Stack gap={2} paddingBlock={8} paddingInline={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					{t("About")}
				</Typography>
				<Article>
					<Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
				</Article>
			</Stack>
		</SingleColumnLayout>
	);
}
