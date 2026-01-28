import { selectLayoutWithRelations } from "@/modules/divider/shared/lib";
import { AuthorCredits } from "@/modules/print/entities/ui";
import { ProjectCredits } from "@/modules/print/entities/ui/ProjectCredits";
import { useAppSelector } from "@/shared/lib";
import { Row, type RowProps } from "@/shared/ui";

type PageCreditsProps = RowProps & {
	mmSize: number;
};

export function PageCredits({ mmSize, ...props }: PageCreditsProps) {
	const layout = useAppSelector(selectLayoutWithRelations);
	if (!layout) {
		return null;
	}
	const { authors } = layout;
	const author = authors.find((author) => author.primary);

	const justifyContent = author?.donationUrl ? "space-between" : "flex-end";

	return (
		<Row {...props} justifyContent={justifyContent}>
			{author?.donationUrl && (
				<AuthorCredits
					mmSize={mmSize}
					authorName={author.name}
					donationUrl={author.donationUrl}
					contactUrl={author.contactUrl}
				/>
			)}
			<ProjectCredits mmSize={mmSize} />
		</Row>
	);
}
