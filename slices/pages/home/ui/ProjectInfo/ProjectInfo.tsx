import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import { Link } from "@/modules/core/router/entities/ui";
import { projectInfoByLanguage } from "@/pages/home/content/projectInfoByLanguage";
import { useAppSelector } from "@/shared/lib";
import { Article } from "@/shared/ui";

const markdownComponents: Partial<Components> = {
	a: ({ href, children, ...rest }) => {
		if (href?.startsWith("/") && !href.startsWith("//")) {
			return (
				<Link to={href} {...rest}>
					{children}
				</Link>
			);
		}
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
				{children}
			</a>
		);
	},
};

export function ProjectInfo() {
	const { t } = useTranslation();
	const language = useAppSelector(selectCurrentLanguage);
	const content = projectInfoByLanguage[language] ?? projectInfoByLanguage.en;

	return (
		<Container>
			<Typography variant="h5" component="h1" gutterBottom>
				{t("home.projectInfo.title")}
			</Typography>
			<Article>
				<Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
					{content}
				</Markdown>
			</Article>
		</Container>
	);
}
